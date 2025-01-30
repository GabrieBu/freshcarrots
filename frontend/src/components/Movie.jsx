import { useParams } from "react-router-dom";
import useMovie from "../hooks/useMovie.js";

function Movie() {
    const { id } = useParams();
    const { movie, loading, error } = useMovie(id);

    if (error) return <h2 className="text-danger text-center mt-4">Error fetching movie</h2>;

    return (
        <div className="container mt-5">
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
                            className="img-fluid rounded shadow-lg w-100"
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

                        <MovieDetails title="Directed by:" data={movie?.crew} />
                        <MovieDetails title="Studios:" data={movie?.studios} />
                        <MovieDetails title="Themes:" data={movie?.themes} />
                        <MovieDetails title="Actors:" data={movie?.actors} />
                    </div>
                </div>
            )}
        </div>
    );
}

// eslint-disable-next-line react/prop-types
const MovieDetails = ({ title, data }) => (
    <div className="mb-3">
        <h5 className="fw-bold">{title}</h5>
        <ul className="list-unstyled">
            {/* eslint-disable-next-line react/prop-types */}
            {data?.map((item, index) => (
                <li key={index} className="text-muted">{item?.role ? `${item.role}: ${item.name}` : item}</li>
            ))}
        </ul>
    </div>
);

export default Movie;
