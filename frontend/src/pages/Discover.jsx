import { useEffect, useState, lazy } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import useMovies from "../hooks/useMovies.js";
import useGenres from "../hooks/useGenres.js";

const Footer = lazy(() => import("../components/Footer"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Navbar = lazy(() => import("../components/Navbar"));

function Discover() {
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState(() => {
    const savedFilters = localStorage.getItem("selectedFilters");
    return savedFilters ? JSON.parse(savedFilters) : [];
  });

  const { genres, error, loading } = useGenres();
  const { movies, errorMovies, loadingMovies } = useMovies(
    pageNumber,
    selectedFilters
  );

  const { ref, inView } = useInView({});

  useEffect(() => {
    if (inView) {
      setPageNumber((pageNumber) => pageNumber + 1); //increase page
    }
  }, [inView]);

  function handleFilterChange(type, value) {
    setSelectedFilters((prevFilters) => {
      let newFilters;
      if (value === "") {
        newFilters = prevFilters.filter((filter) => filter.type !== type);
      } else {
        const existingFilter = prevFilters.find(
          (filter) => filter.type === type
        );
        if (existingFilter) {
          newFilters = prevFilters.map((filter) =>
            filter.type === type ? { type, value } : filter
          );
        } else {
          newFilters = [...prevFilters, { type, value }];
        }
      }
      // Save updated filters to localStorage
      localStorage.setItem("selectedFilters", JSON.stringify(newFilters));
      return newFilters;
    });

    setPageNumber(1); // Reset pagination
  }

  const filters = [
    {
      typeFilter: "title",
      options: [
        {
          name: "",
          label: "All names",
        },
        {
          name: "ascName",
          label: "From A to Z",
        },
        {
          name: "descName",
          label: "From Z to A",
        },
      ],
    },
    {
      typeFilter: "date",
      options: [
        {
          name: "",
          label: "All dates",
        },
        {
          name: "descDate",
          label: "From newest to oldest",
        },
        {
          name: "ascDate",
          label: "From oldest to newest",
        },
      ],
    },
    {
      typeFilter: "rating",
      options: [
        {
          name: "",
          label: "All ratings",
        },
        {
          name: "zeroToOne",
          label: "[0-1]",
        },
        {
          name: "oneToTwo",
          label: "[1-2]",
        },
        {
          name: "twoToThree",
          label: "[2-3]",
        },
        {
          name: "threeToFour",
          label: "[3-4]",
        },
        {
          name: "fourToFive",
          label: "[4-5]",
        },
      ],
    },
    {
      typeFilter: "genre",
      options:
        error || loading ? [] : [{ name: "", label: "All genres" }, ...genres],
    },
  ];

  function handleResetFilter() {
    setSelectedFilters([]);
    localStorage.removeItem("selectedFilters");
    setPageNumber(1);
  }

  return (
    <>
      <Navbar />
      <LayoutContent>
        <h1>All movies: </h1>
        <div
          className="bg-light p-3 mb-4 shadow-sm rounded"
          style={{ border: "1px solid #ccc" }}
        >
          <div className="row gy-2">
            {filters.map((tFilter, index) => {
              const selectedValue =
                selectedFilters.find((f) => f.type === tFilter.typeFilter)
                  ?.value || "";

              return (
                <div className="col-md-3" key={index}>
                  <select
                    id={tFilter.typeFilter}
                    className="form-select"
                    value={selectedValue}
                    onChange={(e) =>
                      handleFilterChange(tFilter.typeFilter, e.target.value)
                    }
                  >
                    {tFilter.options.map((filter, index_) => (
                      <option key={index_} value={filter.name}>
                        {filter.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary"
                onClick={handleResetFilter}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        <div className="container px-5">
          <div className="row g-4 justify-content-center">
            {errorMovies && (
              <h2 className="text-danger">Error loading movies</h2>
            )}
            {movies?.map((movie, index) => (
              <div
                key={index}
                className="col"
                ref={index === movies.length - 1 ? ref : null}
              >
                <Link to={`/movie/${movie?.id}`}>
                  <div className="movie-card-movies">
                    <img src={movie?.link} alt={movie?.name} />
                    <p>{movie?.name}</p>
                  </div>
                </Link>
              </div>
            ))}
            {loadingMovies &&
              [...Array(12)].map((_, index) => (
                <div key={index} className="col">
                  <div className="movie-card-movies">
                    <div
                      className="placeholder w-100"
                      style={{
                        height: "270px",
                        borderRadius: "8px",
                        background: "#e0e0e0",
                      }}
                    ></div>
                    <div className="placeholder col-8 mt-2"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </LayoutContent>
      <Footer />
    </>
  );
}

export default Discover;
