import Review from "../models/Review.js";

/*
* @TODO add filters option
* */

export const getReviews = async (req, res) => {
    const {criticFilter, typeFilter} = req.query;
    const page = parseInt(req.query.page) || 1;
    const toSkip = (page - 1) * 10;
    try {
        const filters = {}
        if(criticFilter && criticFilter !== "all_critics"){
            filters.top_critic === "True" ? true : false;
        }
        if(typeFilter && typeFilter !== "all_types"){
            filters.review_type = typeFilter;
        }
        console.log("filter: " + filters);
        const review = await Review.find(filters)
            .sort({ review_date: -1 }) //from latest to oldest
            .skip(toSkip)  // skip previous pages
            .limit(10); // one page = 10 reviews
        res.json(review);
    } catch (error) {
        res.json({ error_message: error.message });
    }

    /*exports.FindReviewsByMovie = async (req, res) => {
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
    };*/
};