import { useEffect, useState, lazy } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const Footer = lazy(() => import("../components/Footer"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Layout = lazy(() => import("../ui/Layout"));
const LayoutNavbar = lazy(() => import("../ui/LayoutNavbar"));
const Navbar = lazy(() => import("../components/Navbar"));

import useMovies from "../hooks/useMovies.js";
import useGenres from "../hooks/useGenres.js";

function Discover() {
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { genres, error, loading } = useGenres();
  const {
    movies,
    errorMovies,
    loadingMovies = [],
  } = useMovies(pageNumber, selectedFilters);

  const { ref, inView } = useInView({});

  useEffect(() => {
    if (inView) {
      setPageNumber((pageNumber) => pageNumber + 1); //increase page
    }
  }, [inView]);

  const filters = [
    {
      typeFilter: "title",
      options: [
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
      options: error
        ? []
        : loading
        ? [{ name: "loading", label: "Loading..." }]
        : genres || [],
    },
  ];

  function handleResetFilter() {
    setSelectedFilters([]);
    setPageNumber(1);
  }

  return (
    <Layout>
      <LayoutNavbar>
        <Navbar />
      </LayoutNavbar>
      <LayoutContent>
        <h1>All movies: </h1>
        <div
          className="bg-light p-3 mb-4 shadow-sm rounded"
          style={{ border: "1px solid #ccc" }}
        >
          <div className="row gy-2">
            {filters.map((tFilter, index) => (
              <div className="col-md-3" key={index}>
                <select
                  key={index}
                  id={tFilter?.typeFilter}
                  className="form-select"
                >
                  {tFilter.options.map((filter, index_) => (
                    <option key={index_} value={filter?.name}>
                      {filter?.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
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
            {loadingMovies && pageNumber == 0
              ? [...Array(8)].map(
                  (
                    _,
                    index // Render 8 skeleton cards
                  ) => (
                    <div key={index} className="col">
                      <div className="movie-card-movies">
                        <div
                          className="placeholder w-100"
                          style={{
                            height: "180px",
                            borderRadius: "8px",
                            background: "#e0e0e0",
                          }}
                        ></div>
                        <div className="placeholder col-8 mt-2"></div>
                      </div>
                    </div>
                  )
                )
              : movies?.map((movie, index) => (
                  <div
                    key={index}
                    className="col"
                    ref={index === movies.length - 1 ? ref : null}
                  >
                    <Link to={`/movie/${movie?.id}`}>
                      <div
                        className="movie-card-movies"
                        style={{ textDecoration: "none" }}
                      >
                        <img src={movie?.link} alt={movie?.name} />
                        <p>{movie?.name}</p>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </LayoutContent>
      <Footer />
    </Layout>
  );
}

export default Discover;
