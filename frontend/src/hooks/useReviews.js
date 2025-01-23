import {useEffect, useState} from 'react'
import axios from 'axios'
import { set } from 'mongoose';

export default function useReviews(pageNumber,genreFilter,rottenFilter){
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

    useEffect(()=>{
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `http://localhost:3000/getReviews`,
            params: {
                genre: genreFilter !== "All" ? genreFilter : null,
                date: rottenFilter !== "All" ? rottenFilter : null}}
        ).then(res=>{
            setReviews(prevReviews => [...prevReviews, ...res.data]);
            setLoading(false);
        }).catch(err=>{
            console.log(err)
            setError(true);
            setLoading(false);
        })
    }, [genreFilter,rottenFilter])


    return {loading, error, reviews, hasMore};
}