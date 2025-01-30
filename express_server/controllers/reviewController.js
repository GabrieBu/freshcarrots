import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
    const {criticFilter, typeFilter,dateFilter} = req.query;
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
        if(dateFilter && dateFilter !== "all_dates"){
            filters.review_date = dateFilter;
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
};