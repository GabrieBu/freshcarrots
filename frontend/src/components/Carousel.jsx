import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

import MovieCard from "./MovieCard.jsx"; // Custom styles

// eslint-disable-next-line react/prop-types
function Carousel({ title, movies, loading }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(1);

  /* @TODO modify with current width device (formula is correct) */
  //itemsVisible = Math.floor((1570 + 20) / (120 + 20)); //should be correct

  useEffect(() => {
    const calculateItemsVisible = () => {
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
  const nextPage = () => {
    if (currentIndex < moviesLength - itemsVisible) {
      setCurrentIndex(currentIndex + 1);
    }
  };

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
        <h2 className="carousel-title mb-3">{title}</h2>
      )}
      <button
        className="carousel-control prev"
        onClick={prevPage}
        disabled={currentIndex === 0}
        style={{ zIndex: 1 }}
      >
        ❮
      </button>

      <div className="carousel-wrapper">
        <div
          className="carousel-inner-custom"
          style={{ transform: `translateX(-${currentIndex * 12.5}%)` }}
        >
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

      <Link
        className="btn btn-primary"
        to="discover"
        style={{ marginTop: "10px", cursor: "pointer" }}
      >
        Show All
      </Link>
    </div>
  );
}

export default Carousel;
