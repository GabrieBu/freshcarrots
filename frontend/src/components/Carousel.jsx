import { useState } from "react";
import "./Carousel.css";
import useMoviesCarousel from "../hooks/useMoviesCarousel.js";
import Skeleton from "../ui/Skeleton.jsx"; // Custom styles


// eslint-disable-next-line react/prop-types
function Carousel({genre}){
    const {movies, loading, error} = useMoviesCarousel(genre);

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsVisible = 8;

    const nextPage = () => {
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
          {error && <h4 className="text-danger">Error loading {genre} movies</h4>}
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

          <button className="carousel-control next" onClick={nextPage}
                  disabled={currentIndex >= movies.length - itemsVisible}>
              ❯
          </button>
      </div>
    );
};

export default Carousel;
