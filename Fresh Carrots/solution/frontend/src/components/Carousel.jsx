import { useState, useEffect, lazy } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";
const MovieCard = lazy(() => import("./MovieCard"));

// eslint-disable-next-line react/prop-types
function Carousel({ title, movies, loading }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(1);

    /**
     *  Function to calculate dynamically the number of cards visibile on the user custom screen
     *
     * This function gets the sizes of user browser screen and dynamically calculates number of cards to be displayed
     *
     * @function calculateItemsVisible
     *
     * @description
     * - Cards are 120px x 180px, margin (gap) 20px
     * - Stores filters in local storage.
     */
    useEffect(() => {
        const calculateItemsVisible = () => {
            /* Dynamically loading depending on the screen number of cards visible per carousel */
          const containerWidth = window.innerWidth;
          const itemWidth = 120;
          const itemMargin = 20;
          const newItemsVisible = Math.floor(
            containerWidth / (itemWidth + itemMargin)
          );
          console.log("itemsVisible:", newItemsVisible);
          setItemsVisible(newItemsVisible);
        };
        calculateItemsVisible();
        window.addEventListener("resize", calculateItemsVisible);
        return () => window.removeEventListener("resize", calculateItemsVisible);
        }, []);

        // eslint-disable-next-line react/prop-types
        const moviesLength = movies?.length;
        /**
         *
         *  Function to update index of caoursel
         *
         * This increase value of index and stores it in the local state. Index is the current central number of card to be displayed
         *
         * @function nextPage
         *
         */
        const nextPage = () => {
        if (currentIndex < moviesLength - itemsVisible) {
          setCurrentIndex(currentIndex + 1);
        }
    };

    /**
     *
     *  Function to update index of caoursel
     *
     * This decrease value of index and stores it in the local state. Index is the current central number of card to be displayed
     *
     * @function prevPage
     *
     */
    const prevPage = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
        };

  return (
    <div className="carousel-container">
      {loading ? (
        <p aria-hidden="true">
          <span className={`placeholder col-4`}></span>
        </p>
      ) : (
          <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="carousel-title mb-0">{title}</h2>
              <Link className="btn btn-primary ms-3" to="/discover">
                  Show All
              </Link>
          </div>
      )}
        <button
            className="carousel-control prev"
            onClick={prevPage}
            disabled={currentIndex === 0}
            style={{zIndex: 1}}
        >
            ❮
        </button>

        <div className="carousel-wrapper">
        <div
          className="carousel-inner-custom"
          style={{ transform: `translateX(-${currentIndex * 145}px)`}}
        >
            {/* skeleton render when loading, instead display movies cards */}
          {loading
            ? Array.from({ length: itemsVisible }).map((_, index) => (
                <div key={index} className="movie-card skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-title"></div>
                </div>
              ))
            : // eslint-disable-next-line react/prop-types
              movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
        </div>
      </div>
      <button
        className="carousel-control next"
        onClick={nextPage}
        disabled={currentIndex >= moviesLength - itemsVisible}
        style={{ zIndex: 1 }}
      >
        ❯
      </button>

    </div>
  );
}

export default Carousel;
