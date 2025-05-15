import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
    const {criticFilter, typeFilter} = req.query;
    let {minDateFilter, maxDateFilter} = req.query;
    let {reviewMovieFilter} = req.query;

    if(!page){
        res.status(400).send({error: "Missing required parameters"});
    }

    const page = parseInt(req.query.page) || 1;
    const toSkip = (page - 1) * 10;
    try {
        const filters = {}
        if(criticFilter && criticFilter !== "all_critics"){
            filters.top_critic === "True";
        }
        if(typeFilter && typeFilter !== "all_types"){
            filters.review_type = typeFilter;
        }
        if(minDateFilter && minDateFilter !== "all_dates"){
            minDateFilter = new Date(`${minDateFilter}T00:00:00.000Z`);
            filters.review_date = { ...filters.review_date, $gte: minDateFilter };
        }
        if(maxDateFilter && maxDateFilter !== "all_dates"){
            maxDateFilter = new Date(`${maxDateFilter}T00:00:00.000Z`);
            filters.review_date = { ...filters.review_date, $lte: maxDateFilter };
        }
        if(reviewMovieFilter && reviewMovieFilter !== "")
        {
            if(reviewMovieFilter && reviewMovieFilter !== "")
            {
                filters.$or = [
                    { 'movie.name': reviewMovieFilter }, // 1:1 match
                    { 'movie.name': { $regex: `^${reviewMovieFilter}`, $options: 'i' } }, // Starts with (case-insensitive)
                    { 'movie.name': { $regex: reviewMovieFilter, $options: 'i' } } // Contained within (case-insensitive)
                ];
            }
        }
        console.log("filter: " + filters);
        const review = await Review.find(filters)
            .sort({ review_date: -1 }) //from latest to oldest
            .skip(toSkip)  // skip previous pages
            .limit(10); // one page = 10 reviews
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};