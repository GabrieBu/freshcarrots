import CommentSection from "./CommentSection.jsx";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// eslint-disable-next-line react/prop-types
function Review({review}) {
    // eslint-disable-next-line react/prop-types
    const {movie_title, review_content, review_date, link, critic_name, publisher_name, rating, review_type} = review;

    return (
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">{movie_title}</h1>
                <h4 className="">
                    Critic name: {critic_name}
                    <span className="badge bg-secondary">{publisher_name}</span>
                </h4>
                <p className="col-md-12 fs-4">{review_content}</p>
                {rating ? (
                    <h4 className="col-md-8">
                        Rating: {rating}/5
                        <span className="badge bg-secondary">{review_type}</span>
                    </h4>
                ) : (
                    <span className="badge bg-secondary">{review_type}</span>
                )}
                <div className="my-4">
                    <p>{formatDate(review_date)}</p>
                </div>
                <a href={link} className="btn btn-primary btn-md" type="button">Read more on RottenTomatoes</a>
                <CommentSection />
            </div>
        </div>
    )
}

export default Review;