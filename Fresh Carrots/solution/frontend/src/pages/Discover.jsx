import { useEffect, useState, lazy } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import useMovies from "../hooks/useMovies.js";
import useGenres from "../hooks/useGenres.js";
import Loader from "../ui/Loader.jsx";

const Footer = lazy(() => import("../components/Footer"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Navbar = lazy(() => import("../components/Navbar"));

function Discover() {
  const [pageNumber, setPageNumber] = useState(0);
  // initializing filters stored in localstorage
  const [selectedFilters, setSelectedFilters] = useState(() => {
    const savedFilters = localStorage.getItem("selectedFilters");
    return savedFilters ? JSON.parse(savedFilters) : [];
  });
  //retrieve genres from related hook
  const { genres, error, loading } = useGenres();
  //retrieve movies from related hook
  const { movies, errorMovies, loadingMovies } = useMovies(
    pageNumber,
    selectedFilters
  );

  //set ref for infinite scroll
  const { ref, inView } = useInView({});

  useEffect(() => {
    if (inView) {
      setPageNumber((pageNumber) => pageNumber + 1); //increase page
    }
  }, [inView]);


  /**
   *  Function is called whenever a filter change
   *
   * This function updates filters of the page letting the hook be re-triggered each time
   * It stores each time values of filters in the local storage and put pageNumber of the query again to default minimun value 0.
   *
   *
   * @function handleFilterChange
   * @param {string} type - Type of the filter
   * @param {boolean} value - Value of the filter depending on the type
   *
   * @description
   * - Automatically triggers a new fetch every time filters changes.
   * - Stores filters in local storage.
   */
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
    
    setPageNumber(0); // Reset pagination
  }

  const filters = [
    {
      typeFilter: "title",
      options: [
        {
          name: "",
          label: "No Ordering",
        },
        {
          name: "ascName",
          label: "From A to Z",
        },
        {
          name: "descName",
          label: "From Z to A",
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

  /**
   *  Function is called whenever reset filter button is clicked
   *
   * This function deletes each selected filters and clears the local storage
   *
   * @function handleResetFilter
   *
   * @description
   * - Clear local storage and reset filters in local state.
   * - Put pageNumber back again to default minimun value.
   */
  function handleResetFilter() {
    setSelectedFilters([]);
    localStorage.removeItem("selectedFilters");
    setPageNumber(0); //bring back to 0 to re-trigger query to db
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
            {Array.isArray(movies) && movies.map((movie, index) => (
                <div
                    key={index}
                    className="col"
                    ref={index === movies.length - 1 ? ref : null}
                >
                  <Link to={`/movie/${movie?.id}`}>
                    <div className="movie-card-movies relative">
                      {/* Date badge */}
                      {movie?.date && <span className="badge bg-light mb-2 text-dark">{movie?.date}</span>}

                      <img src={movie?.link} alt={movie?.name}/>

                      {/* Movie name */}
                      <p className="mt-2 text-sm font-medium text-center text-gray-800 truncate">
                        {movie?.name}
                      </p>
                    </div>
                  </Link>
                </div>
            ))}
            {loadingMovies && (
                <div className="col-12 my-5">
                  <Loader/>
                </div>
            )}
          </div>
        </div>
      </LayoutContent>
      <Footer/>
    </>
  );
}

export default Discover;
