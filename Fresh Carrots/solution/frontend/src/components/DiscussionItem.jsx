import { Link } from "react-router-dom";

const DiscussionItem = ({
                            id,
                            title,
                            movie,
                            joined,
                            onClick,
                            buttonLabel,
                            buttonVariant = "primary",
                            createdAt
                        }) => {


    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        : null;

    return (
        <div className="card mb-3 shadow-sm border-0 rounded-4">
            <div className="row g-0 align-items-center">
                <div className="col-2 col-sm-2 col-md-2">
                    <div className="ratio ratio-4x3 rounded-start overflow-hidden">
                        <img
                            src={movie?.poster}
                            alt={title}
                            className="img-fluid object-fit-cover w-100 h-100"
                        />
                    </div>
                </div>

                <div className="col-8 col-sm-6 col-md-7">
                    <div className="card-body py-2 px-3">
                        <h6 className="card-title mb-2">
                            <Link to={`/discussion/${id}`} className="text-decoration-none text-dark fw-semibold">
                                <h1>{title}</h1>
                            </Link>
                        </h6>

                        <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                            {movie?.name && <span className="badge text-bg-primary">{movie.name}</span>}
                            {movie?.year && <span className="badge text-bg-secondary">{movie.year}</span>}
                            {joined && <span className="badge text-bg-success">Joined</span>}
                        </div>

                        {formattedDate && (
                            <small className="text-muted">Created on: {formattedDate}</small>
                        )}
                    </div>
                </div>

                <div className="col-12 col-sm-3 text-sm-end text-start px-3 py-2">
                    <button className={`btn btn-sm btn-${buttonVariant}`} onClick={onClick}>
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscussionItem;
