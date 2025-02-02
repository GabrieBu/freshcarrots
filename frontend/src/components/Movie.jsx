import { useParams } from "react-router-dom";
import useMovie from "../hooks/useMovie.js";
import { useState } from "react";

function Movie() {
    const { id } = useParams();
    const { movie, loading, error } = useMovie(id);
    const [showCast, setShowCast] = useState(false);
    const [showThemes, setShowThemes] = useState(false);
    const [showStudios, setShowStudios] = useState(false);

    if (error) return <h2 className="text-danger text-center mt-4">Error fetching movie</h2>;

    return (
        <div className="container mt-5 px-5">
            {loading ? (
                <div className="row">
                    <div className="col-md-4">
                        <div className="skeleton skeleton-image" style={{ height: "450px", width: "100%" }}></div>
                    </div>
                    <div className="col-md-8">
                        <div className="skeleton skeleton-title" style={{ width: "60%", height: "40px" }}></div>
                        <div className="skeleton skeleton-text" style={{ width: "80%", height: "20px", marginTop: "10px" }}></div>
                        <div className="skeleton skeleton-text" style={{ width: "100%", height: "150px", marginTop: "20px" }}></div>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={movie?.link}
                            alt={movie?.name}
                            className="img-fluid rounded w-100"
                            style={{ maxHeight: "450px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col-md-8">
                        <h1 className="display-4 fw-bold">{movie?.name}</h1>
                        <p className="lead text-muted fst-italic">{movie?.tagline}</p>
                        <p className="text-justify">{movie?.description}</p>

                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
                            <h5 className="text-primary">
                                {movie?.minute} min | {movie?.date}
                            </h5>
                            <h5 className="text-warning">
                                ⭐ {movie?.rating} / 5
                            </h5>
                        </div>
                        <div className="d-flex gap-3 my-4">
                            <button className="btn btn-primary" onClick={() => setShowCast(!showCast)}>
                                {showCast ? "Hide cast" : "Show cast"}
                            </button>
                            <button className="btn btn-primary" onClick={() => setShowThemes(!showThemes)}>
                                {showThemes ? "Hide themes" : "Show themes"}
                            </button>
                            <button className="btn btn-primary" onClick={() => setShowStudios(!showStudios)}>
                                {showStudios ? "Hide studios" : "Show studios"}
                            </button>
                        </div>
                        {showCast && (
                            <div className="row align-items-start mb-3">
                                <div className="col border p-3">
                                    <h3>Actors: </h3>
                                    <p>{movie?.crew.map((member) => `${member?.name}: ${member?.role}`).join(', ')}</p>
                                </div>
                            </div>
                        )}
                        {showThemes && (
                            <div className="row align-items-start mb-3">
                                <div className="col border p-3">
                                    <h3>Themes: </h3>
                                    <p>{movie?.themes?.join(', ')}</p>
                                </div>
                            </div>
                        )}
                        {showStudios && (
                            <div className="row align-items-start mb-3">
                                <div className="col border p-3">
                                    <h3>Studios: </h3>
                                    <p>{movie?.studios?.join(', ')}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Movie;
