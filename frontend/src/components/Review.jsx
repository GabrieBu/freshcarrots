// eslint-disable-next-line react/prop-types
function Review({ review }) {
    console.log(review);

    return (
    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Title movie review</h1>
            <p className="col-md-8 fs-4">Using a series of utilities, you will put here the description of the review, rating and whatelse you want</p>
            <button className="btn btn-primary btn-lg" type="button">Example button</button>
        </div>
    </div>)
}

export default Review;