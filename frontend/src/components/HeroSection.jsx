import { useState } from "react";
import useHeroSection from "../hooks/useHeroSection.js";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function HeroSection({ ref }) {
    const { movies, loading, error } = useHeroSection();
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    function handleClickCarousel(id_film) {
        navigate(`/movie/${id_film}`);
    }

    return (
        error ?
            <h1 className="text-danger">Error loading Top 5 movies. Try again later...</h1>
            :
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade w-100 vh-100 bg-white"
                data-bs-ride="carousel"
                ref={ref}
            >
                <div className="carousel-indicators">
                    {movies?.map((_, index) => (
                        <li
                            key={index}
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index}
                            className={index === currentIndex ? "active" : ""}
                        ></li>
                    ))}
                </div>

                <div className="carousel-inner h-100">
                    {movies?.map((movie, index) => (
                        <div
                            key={index}
                            className={`carousel-item h-100 ${index === currentIndex ? "active" : "blurred"}`}
                            onClick={() => handleClickCarousel(movie?.id)}
                        >
                            <div className="row w-100 h-100">
                                <div className="col-6 h-100 d-flex justify-content-center align-items-center">
                                    {loading ? (
                                        <div className="skeleton skeleton-image d-block w-75 h-100"></div>
                                    ) : (
                                        <img
                                            src={movie?.link}
                                            className="d-block w-75 h-auto object-fit-cover"
                                            alt={`Slide ${index + 1}`}
                                        />
                                    )}
                                </div>
                                <div className="col-6 d-flex flex-column justify-content-center align-items-start p-5">
                                    <h3>{movie?.name}</h3>
                                    <h5>⭐ {movie?.rating}/5</h5>
                                    <p>{movie?.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)}
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
    );
}

export default HeroSection;
