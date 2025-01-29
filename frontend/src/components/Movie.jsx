import {useParams} from "react-router-dom";
import useMovie from "../hooks/useMovie.js";

function Movie() {
    const {id} = useParams();

    const {movie, error} = useMovie(id);
    return (
        error ? <h2 className="text-danger">Error fetching movie</h2> : <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={movie?.link}
                        alt={movie?.name}
                        className="img-fluid rounded shadow-lg"
                    />
                </div>
                <div className="col-md-8">
                    <h1 className="display-4 font-weight-bold">{movie?.name}</h1>
                    <p className="lead text-muted">{movie?.tagline}</p>
                    <p className="text-justify">{movie?.description}</p>

                    <div className="d-flex justify-content-between mb-4">
                        <div className="badge badge-pill badge-primary">{movie?.minute} min | {movie?.date}</div>
                        <div className="badge badge-pill badge-warning">{`Rating: ${movie?.rating}/5`}</div>
                    </div>

                    <h5>Directed by:</h5>
                    <ul className="list-unstyled">
                        {movie?.crew.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>

                    <h5>Studios:</h5>
                    <ul className="list-unstyled">
                        {movie?.studios.map((studio, index) => (
                            <li key={index}>{studio}</li>
                        ))}
                    </ul>

                    <h5>Languages:</h5>
                    <ul className="list-unstyled">
                        {movie?.languages.map((language, index) => (
                            <li key={index}>{language}</li>
                        ))}
                    </ul>

                    <h5>Actors:</h5>
                    <ul className="list-unstyled">
                        {movie?.actors.map((actor, index) => (
                            <li key={index}>{actor}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Movie;
