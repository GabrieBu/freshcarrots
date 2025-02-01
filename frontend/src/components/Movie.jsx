import { useParams } from "react-router-dom";
import useMovie from "../hooks/useMovie.js";

function Movie() {
    const { id } = useParams();
    const { movie, loading, error } = useMovie(id);

    if (error) return <h2 className="text-danger text-center mt-4">Error fetching movie</h2>;

    return (
        <div className="container mt-5 my-5">
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
                        <MovieDetailsBothCollapse title="cast" firstData={movie?.crew} secondData={movie?.actor} />
                        <MovieDetailsCollapse title="Themes" data={movie?.themes} />
                        <MovieDetailsCollapse title="Studios" data={movie?.studios} />
                    </div>
                </div>
            )}
        </div>
    );
}

// eslint-disable-next-line react/prop-types
const MovieDetailsBothCollapse = ({title, firstData, secondData}) => {
    return(<>
        <button className="btn btn-primary" type="button" data-toggle="collapse"
                data-target=".multi-collapse" aria-expanded="false"
                aria-controls="multiCollapseExample1 multiCollapseExample2">Show {title}
        </button>
        <div className="row">
            <div className="col">
                <div className="collapse multi-collapse" id="multiCollapseExample1">
                    <div className="card card-body">
                        <h3>Directed by: </h3>
                        {/* eslint-disable-next-line react/prop-types */}
                        {firstData?.map(member => `${member?.name}: ${member?.role}`).join(', ')}
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="collapse multi-collapse" id="multiCollapseExample2">
                    <div className="card card-body">
                        <h3>Actors: </h3>
                        {/* eslint-disable-next-line react/prop-types */}
                        {secondData?.map(member => `${member?.name}: ${member?.role}`).join(', ')}
                    </div>
                </div>
            </div>
        </div></>
    )
};

// eslint-disable-next-line react/prop-types
const MovieDetailsCollapse = ({ title, data }) => {
    return (
        <>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${title}`} aria-expanded="false" aria-controls={`collapse-${title}`}>
                Show {title}
            </button>
            <div className="collapse" id={`collapse-${title}`} >
                <div className="card card-body">
                    <h3>{title}: </h3>
                    {/* eslint-disable-next-line react/prop-types */}
                    {data?.map((item, index) => (
                        <p key={index}>{item?.role ? `${item?.name}: ${item?.role}` : item}</p>
                    ))}
                </div>
            </div>
        </>
    );
};


export default Movie;
