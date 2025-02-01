import { useState } from "react";
import useHeroSection from "../hooks/useHeroSection.js";
import { useNavigate } from "react-router-dom";

function HeroSection() {
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
                            <div className="row w-100 h-100 justify-content-center align-items-center">
                                {/* Left Adjacent Movie */}
                                <div
                                    className={`col-3 h-100 ${index === (currentIndex - 1 + movies.length) % movies.length ? "blurred" : ""}`}
                                    style={{
                                        filter: index === (currentIndex - 1 + movies.length) % movies.length ? "blur(5px)" : "none",
                                        opacity: index === (currentIndex - 1 + movies.length) % movies.length ? 0.5 : 1,
                                    }}
                                >
                                    {loading ? (
                                        <div className="skeleton skeleton-image d-block w-100 h-100"></div>
                                    ) : (
                                        <img
                                            src={movie?.link}
                                            className="d-block w-100 h-auto object-fit-cover"
                                            alt={`Slide ${index + 1}`}
                                        />
                                    )}
                                </div>

                                {/* Main Movie */}
                                <div className="col-4 h-100 d-flex justify-content-center align-items-center">
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

                                {/* Right Adjacent Movie */}
                                <div
                                    className={`col-3 h-100 ${index === (currentIndex + 1) % movies.length ? "blurred" : ""}`}
                                    style={{
                                        filter: index === (currentIndex + 1) % movies.length ? "blur(5px)" : "none",
                                        opacity: index === (currentIndex + 1) % movies.length ? 0.5 : 1,
                                    }}
                                >
                                    {loading ? (
                                        <div className="skeleton skeleton-image d-block w-100 h-100"></div>
                                    ) : (
                                        <img
                                            src={movie?.link}
                                            className="d-block w-100 h-auto object-fit-cover"
                                            alt={`Slide ${index + 1}`}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Prev Button */}
                <button
                    className="carousel-control-prev text-black"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)}
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                {/* Next Button */}
                <button
                    className="carousel-control-next text-black"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)}
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
    );
}

export default HeroSection;
