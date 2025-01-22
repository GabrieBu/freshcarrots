import Review from "../models/Review.js";

/*
* @TODO add filters option
* */

export const getReviews = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const toSkip = (page - 1) * 10;
    try {
        const review = await Review.find(undefined, undefined, undefined)
            .sort({ review_date: -1 })
            .skip(toSkip)  // skip previous pages
            .limit(10); // one page = 10 reviews
        console.log("Review returned: " + JSON.stringify(review));
        res.json(review);
    } catch (error) {
        res.json({ error_message: error.message });
    }
};