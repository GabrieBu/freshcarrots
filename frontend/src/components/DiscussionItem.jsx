import { Link } from "react-router-dom";

function DiscussionItem({ id, title, poster, joined, onClick, buttonLabel, buttonVariant = "primary" }) {
    return (
        <div className="card mb-3 shadow-sm">
            <div className="row g-0 align-items-center">
                <div className="col-3 col-sm-2">
                    <img
                        src={poster}
                        alt={title}
                        className="img-fluid rounded-start"
                        style={{ width: "100%", height: "160px", objectFit: "cover" }}
                    />
                </div>
                <div className="col-9 col-sm-7">
                    <div className="card-body py-2">
                        <h5 className="card-title mb-1">
                            <Link to={`/discussion/${id}`} className="text-decoration-none text-dark fw-bold">
                                {title}
                            </Link>
                        </h5>
                        {joined && <span className="badge bg-success">Joined</span>}
                    </div>
                </div>
                <div className="col-12 col-sm-3 text-sm-end text-start p-2">
                    <button className={`btn btn-${buttonVariant}`} onClick={onClick}>
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DiscussionItem;
