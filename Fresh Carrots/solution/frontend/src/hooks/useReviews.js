import {useEffect, useState} from 'react'
import axios from 'axios'

/**
 * Custom hook to fetch paginated movie reviews with multiple filtering options.
 *
 * This hook queries the `/getReviews` endpoint, allowing filtering by critic, review type,
 * date range, and reviewed movie. It supports pagination (infinite scroll) and accumulates
 * results page by page unless it's the first page, in which case it resets the list.
 *
 * @function useReviews
 * @param {number} pageNumber - The current page number (1-based index) used for pagination.
 * @param {string} criticFilter - Filter for a specific critic or reviewer (optional).
 * @param {string} typeFilter - Filter for the review type (e.g. "positive", "negative", etc.).
 * @param {string} minDateFilter - Minimum date in the date range filter (format: YYYY-MM-DD).
 * @param {string} maxDateFilter - Maximum date in the date range filter (format: YYYY-MM-DD).
 * @param {string} reviewMovieFilter - Filter for reviews of a specific movie (by ID or name).
 *
 * @returns {Object} An object containing:
 * - {Array} reviews - The array of fetched review objects.
 * - {boolean} loading - Whether the data is currently being fetched.
 * - {boolean} error - Whether an error occurred during the fetch.
 * - {boolean} hasMore - Whether there are more reviews to load (based on the response length).
 *
 * @example
 * const {
 *   reviews,
 *   loading,
 *   error,
 *   hasMore
 * } = useReviews(1, "JohnDoe", "positive", "2023-01-01", "2024-01-01", "Inception");
 *
 * @description
 * - Fetches reviews based on provided filters and supports infinite scroll pagination.
 * - Automatically resets the review list when `pageNumber === 1`.
 * - Tracks if there are more reviews available (`hasMore`) based on the response.
 * - Handles loading and error states for responsive UI updates.
 */
export default function useReviews(pageNumber, criticFilter, typeFilter,minDateFilter, maxDateFilter,reviewMovieFilter){
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true); //first thing we do is loading
    const [error, setError] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        setLoading(true);
        setError(false);

        //remove all reviews already fetched
        if(pageNumber === 1){
            setReviews([]);
        }

        axios({
            method: "GET",
            url: `http://localhost:3000/getReviews`,
            params: { //params handled by backend express_server
                page: pageNumber,
                criticFilter: criticFilter,
                typeFilter: typeFilter,
                minDateFilter: minDateFilter,
                maxDateFilter: maxDateFilter,
                reviewMovieFilter: reviewMovieFilter
        }}
        ).then(res=>{
            setReviews(prevReviews => [...prevReviews, ...res.data]); //update new reviews
            setHasMore(res.data.length > 0); // if data is returned, there are more pages
            setLoading(false);
        }).catch(err=>{
            console.log(err)
            setError(true); //it will be returned so then we will take actions in the page
            setLoading(false);
        })
    }, [pageNumber, criticFilter, typeFilter, minDateFilter, maxDateFilter, reviewMovieFilter]);

    return {loading, error, reviews, hasMore}
}