import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useMovies(pageNumber) {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `http://localhost:3000/getAllMovies`,
            params: {
                page: pageNumber,
            }
        })
            .then((res) => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, [pageNumber]);

    return { movie, loading, error };
}