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
    const {movie_title, review_content, review_date, link, critic_name, publisher_name} = review;

    return (
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">{movie_title}</h1>
                <h3 className="display-5 fw-bold">{critic_name}. Published by: {publisher_name}</h3>
                <p className="col-md-8 fs-4">{review_content}</p>
                <div className="my-4">
                    <p>{formatDate(review_date)}</p>
                </div>
                <a href={link} className="btn btn-primary btn-lg" type="button">Read more</a>
            </div>
        </div>
    )
}

export default Review;