import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useSearch(query) {
    const [moviesSearched, setMoviesSearched] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!query.trim() || query.length < 2) { //unnecessary calling api
            setMoviesSearched([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(false);

        const timeoutId = setTimeout(() => {
            let cancel;
            axios({
                method: "GET",
                url: `http://localhost:3000/getMovieByName`,
                params: { name: query },
                cancelToken: new axios.CancelToken((c) => (cancel = c))
            })
                .then((res) => {
                    setMoviesSearched(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    if (axios.isCancel(err)) return;
                    console.error("Error fetching movies: " + err);
                    setError(true);
                    setMoviesSearched([]);
                    setLoading(false);
                });

            return () => cancel();
        }, 500); // debounce time

        return () => clearTimeout(timeoutId);
    }, [query]);

    return { moviesSearched, loading, error };
}