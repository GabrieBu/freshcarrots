import { useState } from "react";
import "./Carousel.css";
import Skeleton from "../ui/Skeleton.jsx"; // Custom styles

// eslint-disable-next-line react/prop-types
function Carousel({genre, movies, loading}){
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsVisible = 16;

    const nextPage = () => {
        // eslint-disable-next-line react/prop-types
        if (currentIndex < movies.length - itemsVisible) {
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
          {loading ? <Skeleton /> : <h2 className="carousel-title">{genre} movies you can like</h2>}
          <button className="carousel-control prev" onClick={prevPage} disabled={currentIndex === 0}>
              ❮
          </button>

          <div className="carousel-wrapper">
              <div className="carousel-inner" style={{transform: `translateX(-${currentIndex * 12.5}%)`}}>
                  {loading
                      ? Array.from({ length: itemsVisible }).map((_, index) => (
                          <div key={index} className="movie-card skeleton">
                              <div className="skeleton-image"></div>
                              <div className="skeleton-title"></div>
                          </div>
                      ))
                      // eslint-disable-next-line react/prop-types
                      : movies.map((movie) => (
                          <div
                              key={movie.id}
                              className="movie-card"
                              onClick={() => alert(`Hai cliccato su: ${movie?.name}`)}
                          >
                              <img src={movie?.link} alt={movie?.name} />
                              <p>{movie?.name}</p>
                          </div>
                      ))}
              </div>
          </div>
          {/* eslint-disable-next-line react/prop-types */}
          <button className="carousel-control next" onClick={nextPage} disabled={currentIndex >= movies.length - itemsVisible}>
              ❯
          </button>
      </div>
    );
};

export default Carousel;
