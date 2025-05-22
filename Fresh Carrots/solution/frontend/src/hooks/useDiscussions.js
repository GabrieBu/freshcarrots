import {useEffect, useState} from "react";
import axios from "axios";
import movie from "../pages/Movie.jsx";

export default function useDiscussions(movieQuery, sortByDate) {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);

        axios({
            method: "GET",
            url: `http://localhost:3000/getDiscussions`,
            params: {
                movieQuery,
                sortByDate
            }
        })
            .then((res) => {
                setDiscussions(res.data); // else  append new discussions
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, [movieQuery, sortByDate]);

    return { discussions, loading, error };
}
