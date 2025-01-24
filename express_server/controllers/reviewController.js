import Review from "../models/Review.js";

/*
* @TODO add filters option
* */

export const getReviews = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const toSkip = (page - 1) * 10;
    try {
        const filter = {};
        if (req.query.critic_name) filter.critic_name = req.query.critic_name;
        if (req.query.review_type) filter.review_type = req.query.review_type;
        const review = await Review.find(filter, undefined, undefined)
            .sort({ review_date: -1 })
            .skip(toSkip)  // skip previous pages
            .limit(10); // one page = 10 reviews
        console.log("Review returned: " + JSON.stringify(review));
        res.json(review);
    } catch (error) {
        res.json({ error_message: error.message });
    }

    exports.FindReviewsByMovie = async (req, res) => {
        const { movie_name } = req.query;

        if (!movie_name) {
            return res.status(400).send("movie_name is required");
        }

        try {
            const reviews = await Review.find(movie_name,undefined,undefined );
            if (reviews ) {
                res.json(reviews);
            } else {
                res.json({ message: "No reviews found for this movie" });
            }
        } catch (error) {
            res.status(500).send("Error occurred: " + error.message);
        }
    };


};