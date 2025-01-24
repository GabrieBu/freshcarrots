const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// eslint-disable-next-line react/prop-types
function Review({ review}) {
    // eslint-disable-next-line react/prop-types
    const {movie_title, review_content, review_date, link, critic_name, publisher_name, rating} = review;

    return (
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">{movie_title}</h1>
                <h4 className="display-5">Critic name: {critic_name} <span className="badge badge-pill badge-info">{publisher_name}</span></h4>
                <p className="col-md-12 fs-4">{review_content}</p>
                <p className="col-md-8">Rating: {rating}/5</p>
                <div className="my-4">
                    <p>{formatDate(review_date)}</p>
                </div>
                <a href={link} className="btn btn-primary btn-lg" type="button">Read more</a>
            </div>
        </div>
    )
}

export default Review;