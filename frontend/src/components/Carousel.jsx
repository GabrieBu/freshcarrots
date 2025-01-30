import { useState, useRef } from "react";
import "./Carousel.css";
import Skeleton from "../ui/Skeleton.jsx";
import {Link} from "react-router-dom"; // Custom styles

// eslint-disable-next-line react/prop-types
function Carousel({genre, movies, loading}){
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerWidth = useRef();
    const itemsVisible = Math.floor((1570) / (120 + 20));

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

    console.log(genre, movies, moviesLength);

    return (
        <div className="carousel-container">
            {loading ? <Skeleton /> : <h2 className="carousel-title">{genre} movies you can like</h2>}
            <button className="carousel-control prev" onClick={prevPage} disabled={currentIndex === 0} style={{ zIndex: 1 }} >
                ❮
            </button>

            <div className="carousel-wrapper" ref={containerWidth}>
                <div className="carousel-inner-custom" style={{transform: `translateX(-${currentIndex * 12.5}%)`}}>
                    {loading
                        ? Array.from({ length: itemsVisible}).map((_, index) => (
                            <div key={index} className="movie-card skeleton">
                                <div className="skeleton-image"></div>
                                <div className="skeleton-title"></div>
                            </div>
                        ))
                        // eslint-disable-next-line react/prop-types
                        : movies.map((movie, index) => (
                            <Link key={index} to={`/movie/${movie?.id}`}>
                                <div
                                    key={movie.id}
                                    className="movie-card"
                                >
                                    <img src={movie?.link} alt={movie?.name} />
                                    <p>{movie?.name}</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
            <button className="carousel-control next" onClick={nextPage} disabled={currentIndex >= moviesLength - itemsVisible}>
                ❯
            </button>
        </div>
    );
}

export default Carousel;
