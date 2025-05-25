import {useEffect, useState} from 'react'
import axios from 'axios'

/*
* Hook used to get the list reviews (paginated query, mongodb)
* Used in Reviews page
* */

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