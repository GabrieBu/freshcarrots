import { useState } from "react";
import useHeroSection from "../hooks/useHeroSection.js";
import { useNavigate } from "react-router-dom";

function printNumberCardinal(index) {
    console.log("index" + index);
    switch (index) {
        case 0:
            return "st"
        case 1:
            return "nd"
        case 2:
            return "rd"
        case 3:
            return "th"
        case 4:
            return "th"
        case 5:
            return "th"
        default:
            return "st"
    }
}

// eslint-disable-next-line react/prop-types
function HeroSection({ ref }) {
    const { movies, loading, error } = useHeroSection();
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleClickCarousel = (id_film) => {
        navigate(`/movie/${id_film}`);
    };

    return error ? (
        <h1 className="text-danger text-center mt-5">
            Error loading Top 5 movies. Try again later...
        </h1>
    ) : (
        <div
            id="carouselExampleFade"
            className="carousel slide w-100 vh-100 d-flex align-items-center"
            style={{ backgroundColor: "#1b1e21" }}
            data-bs-ride="carousel"
            ref={ref}
        >
            <div className="carousel-inner w-100 px-4">
                {movies?.map((movie, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === currentIndex ? "active" : ""}`}
                        style={{ height: "60vh", transition: "transform 0.5s ease" }}
                    >
                        <div
                            className="d-flex justify-content-center align-items-center position-relative h-100"
                        >
                            <div
                                className="position-absolute top-0 start-0 text-white"
                                style={{
                                    fontSize: "200px",
                                    fontWeight: "900",
                                    opacity: 0.2,
                                    zIndex: 0,
                                    lineHeight: "1",
                                    padding: "20px",
                                }}
                            >
                                {index + 1 + printNumberCardinal(index).toString()}
                            </div>
                            <div
                                className="card shadow-lg rounded-4 overflow-hidden d-flex flex-row position-relative h-100"
                                style={{
                                    maxWidth: "1100px",
                                    width: "100%",
                                    backgroundColor: "#fff",
                                    border: "1px solid #ccc",
                                }}
                            >
                                <div
                                    className="bg-black d-flex justify-content-center align-items-center"
                                    style={{ width: "50%", backgroundColor: "#000", height: "100%" }}
                                >
                                    {loading ? (
                                        <div className="skeleton skeleton-image w-100"></div>
                                    ) : (
                                        <img
                                            src={movie?.link}
                                            alt={`Poster of ${movie?.name}`}
                                            className="img-fluid"
                                            onClick={() => handleClickCarousel(movie?.id)}
                                            style={{
                                                width: "100%",
                                                display: "block",
                                                borderRadius: "10",
                                            }}
                                        />
                                    )}
                                </div>

                                <div
                                    className="p-4 d-flex flex-column justify-content-center"
                                    style={{width: "65%", height: "95%", margin: "auto"}}
                                >
                                    {loading ? (
                                        <>
                                            <div
                                                className="skeleton skeleton-title mb-3"
                                                style={{width: "60%", height: "30px"}}
                                            ></div>
                                            <div
                                                className="skeleton skeleton-text"
                                                style={{width: "40%", height: "20px"}}
                                            ></div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className="d-flex flex-column justify-content-center h-100"
                                                style={{
                                                    padding: "20px",
                                                    gap: "10px",
                                                }}
                                            >
                                                <h2
                                                    className="fw-bold"
                                                    style={{
                                                        fontSize: "3rem", // Bigger title
                                                        marginBottom: "0.5rem",
                                                        lineHeight: "1.2",
                                                    }}
                                                >
                                                    {movie?.name}
                                                </h2>

                                                <h5
                                                    className="text-warning"
                                                    style={{
                                                        fontWeight: "500",
                                                        fontSize: "1.1rem",
                                                    }}
                                                >
                                                    ⭐ {movie?.rating}/5
                                                </h5>

                                                <h6
                                                    className="text-muted"
                                                    style={{
                                                        fontSize: "1rem",
                                                        lineHeight: "1.5",
                                                        maxHeight: "100%", // no cut-off
                                                        overflowY: "auto", // scroll if needed
                                                    }}
                                                >
                                                    {movie?.description}
                                                </h6>

                                                <button
                                                    className="btn btn-outline-secondary align-self-start mt-2"
                                                    style={{
                                                        fontSize: "0.9rem",
                                                        padding: "6px 12px",
                                                        borderRadius: "6px",
                                                    }}
                                                    onClick={() => handleClickCarousel(movie?.id)}
                                                >
                                                    Read More
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
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
                aria-label="Previous Slide"
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
                aria-label="Next Slide"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default HeroSection;
