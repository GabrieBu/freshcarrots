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
            url: "http://localhost:3000/getReviews",
            params: {page:pageNumber}}
        ).then(res=>{
            console.log("returned new: " + JSON.stringify(res.data));
            setReviews(prevReviews => {
                return [...new Set([...prevReviews, ...res.data])]
            });
        }).catch(err=>{
            console.log(err)
            setError(true); //it willk be returned so then we will take actions in the page
        })
    }, [pageNumber])

    return {loading, error, reviews, hasMore};
}