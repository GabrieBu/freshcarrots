import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
    try {
        const review = await Review.find(undefined, undefined, undefined).limit(100); //limit to 100 otherwise it would be a BIG query
        console.log("Review returned: " + JSON.stringify(review));
        res.json(review);
    } catch (error) {
        res.json({ error_message: error.message });
    }
};