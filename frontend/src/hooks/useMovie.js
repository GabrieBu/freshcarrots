import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useMovie(id) {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `http://localhost:3000/getMovieById`,
            params: {
                id: id
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
    }, []);

    return { movie, loading, error };
}