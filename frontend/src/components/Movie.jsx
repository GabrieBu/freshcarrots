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

                        {/* Buttons in one row with some space between them */}
                        <div className="d-flex gap-3 mb-3">
                            <MovieDetailsBothCollapse title="cast" firstData={movie?.crew} secondData={movie?.actor} />
                            <MovieDetailsCollapse title="Themes" data={movie?.themes} />
                            <MovieDetailsCollapse title="Studios" data={movie?.studios} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// eslint-disable-next-line react/prop-types
const MovieDetailsBothCollapse = ({ title, firstData, secondData }) => {
    return (
        <>
            <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${title}-1`}
                aria-expanded="false"
                aria-controls={`collapse-${title}-1`}
            >
                Show {title}
            </button>
            <div className="row mt-2">
                <div className="col">
                    <div className="collapse" id={`collapse-${title}-1`}>
                        <div className="card card-body">
                            <h3>Directed by: </h3>
                            {firstData?.map((member, index) => (
                                <p key={index}>{member?.name}: {member?.role}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="collapse" id={`collapse-${title}-2`}>
                        <div className="card card-body">
                            <h3>Actors: </h3>
                            {secondData?.map((member, index) => (
                                <p key={index}>{member?.name}: {member?.role}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// eslint-disable-next-line react/prop-types
const MovieDetailsCollapse = ({ title, data }) => {
    return (
        <>
            <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${title}`}
                aria-expanded="false"
                aria-controls={`collapse-${title}`}
            >
                Show {title}
            </button>
            <div className="collapse mt-2" id={`collapse-${title}`} >
                <div className="card card-body">
                    <h3>{title}: </h3>
                    {data?.map((item, index) => (
                        <p key={index}>{item?.role ? `${item?.name}: ${item?.role}` : item}</p>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Movie;
