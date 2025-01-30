import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useSearch(query) {
    const [moviesSearched, setMoviesSearched] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: "GET",
            url: `http://localhost:3000/getMovieByName`,
            params:{
                name: query,
            },
            cancelToken: new axios.CancelToken(c => c = cancel)
        })
            .then((res) => {
                setMoviesSearched(res.data);
                setLoading(false);
            })
            .catch((err) => {
                if(axios.isCancel(err)) return; /* cancel the query if multiple letters typed in*/
                console.error("Error five topMovies: " + err);
                setError(true);
                setLoading(false);
            });
    }, [query]);

    return { moviesSearched, loading, error };
}