import Review from "../models/Review.js";

/**
 * Retrieves paginated movie reviews with optional filtering by critic type, review type,
 * review date range, and movie title.
 *
 * @route GET /reviews
 * @queryparam {string} [criticFilter] - Filter by critic type (e.g. "all_critics", "top_critics")
 * @queryparam {string} [typeFilter] - Filter by review type (e.g. "Fresh", "Rotten", or "all_types")
 * @queryparam {string} [minDateFilter] - Minimum review date (ISO format: YYYY-MM-DD)
 * @queryparam {string} [maxDateFilter] - Maximum review date (ISO format: YYYY-MM-DD)
 * @queryparam {string} [reviewMovieFilter] - Partial or full movie title to search for
 * @queryparam {number} [page=1] - Page number for pagination (each page contains 10 reviews)
 *
 * @param {Object} req - Express request object containing query parameters
 * @param {Object} res - Express response object for sending filtered and paginated review data
 *
 * @returns {Object[]} Array of review documents matching the filters
 */
export const getReviews = async (req, res) => {
    const {criticFilter, typeFilter} = req.query;
    let {minDateFilter, maxDateFilter} = req.query;
    let {reviewMovieFilter} = req.query;

    const page = parseInt(req.query.page) || 1;
    const toSkip = (page - 1) * 10;

    if(!page){
        res.status(400).send({error_message: "Missing required parameters"});
    }

    console.log(JSON.stringify(req.query));

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
                    { 'movie_title': reviewMovieFilter }, // 1:1 match
                    { 'movie_title': { $regex: `^${reviewMovieFilter}`, $options: 'i' } }, // Starts with (case-insensitive)
                    { 'movie_title': { $regex: reviewMovieFilter, $options: 'i' } } // Contained within (case-insensitive)
                ];
            }
        }
        console.log("filter: " + filters);
        const reviews = await Review.find(filters)
            .sort({ review_date: -1 }) //from latest to oldest
            .skip(toSkip)  // skip previous pages
            .limit(10); // one page = 10 reviews

        console.log(reviews)

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error_message: error.message });
    }
};