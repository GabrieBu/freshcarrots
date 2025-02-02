import {useEffect, useState} from 'react'
import axios from 'axios'

export default function useReviews(pageNumber, criticFilter, typeFilter,minDateFilter, maxDateFilter,ReviewMovieFilter){
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true); //first thing we do is loading
    const [error, setError] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        setLoading(true);
        setError(false);

        if(pageNumber === 1){
            setReviews([]);
        }

        axios({
            method: "GET",
            url: `http://localhost:3000/getReviews`,
            params: {
                page: pageNumber,
                criticFilter: criticFilter,
                typeFilter: typeFilter,
                minDateFilter: minDateFilter,
                maxDateFilter: maxDateFilter,
                ReviewMovieFilter: ReviewMovieFilter
        }}
        ).then(res=>{
            setReviews(prevReviews => [...prevReviews, ...res.data]);
            setHasMore(res.data.length > 0); // if data is returned, there are more pages
            setLoading(false);
        }).catch(err=>{
            console.log(err)
            setError(true); //it will be returned so then we will take actions in the page
            setLoading(false);
        })
    }, [pageNumber, criticFilter, typeFilter, minDateFilter, maxDateFilter, ReviewMovieFilter]);

    return {loading, error, reviews, hasMore}
}