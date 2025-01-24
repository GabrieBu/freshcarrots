import {useEffect, useState} from 'react'
import axios from 'axios'
import { set } from 'mongoose';

export default function useReviews(pageNumber,top_critic_filter,rottenFilter){
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true); //first thing we do is loading
    const [error, setError] = useState(false);
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        setLoading(true);
        setError(false);
        const params = {
            page: pageNumber,
            top_critic: top_critic_filter !== "All" ? top_critic_filter : null,
            review_type: rottenFilter !== "All" ? rottenFilter : null,
        };
        axios({
            method: "GET",
            url: `http://localhost:3000/getReviews`,
            params: params}
        ).then(res=>{
            setReviews(prevReviews => [...prevReviews, ...res.data]);
            setLoading(false);
        }).catch(err=>{
            console.log(err)
            setError(true); //it will be returned so then we will take actions in the page
            setLoading(false);
        })
    }, [pageNumber])

    return {loading, error, reviews, hasMore}
}