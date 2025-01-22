import {useEffect, useState} from 'react'
import axios from 'axios'

export default function useReviews(pageNumber){
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true); //first thing we do is loading
    const [error, setError] = useState(false);
    const [reviews, setReviews] = useState([]);


    useEffect(()=>{
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `http://localhost:3000/getReviews?page=${pageNumber}`,
            params: {page:pageNumber}}
        ).then(res=>{
            setReviews(prevReviews => [...prevReviews, ...res.data]);
            setLoading(false);
        }).catch(err=>{
            console.log(err)
            setError(true); //it will be returned so then we will take actions in the page
            setLoading(false);
        })
    }, [pageNumber])

    return {loading, error, reviews, hasMore};
}