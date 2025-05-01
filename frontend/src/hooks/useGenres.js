import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useGenres() {
    const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `http://localhost:3000/getGenres`,
        })
            .then((res) => {
                const formatted = res.data.map(item => ({
                    name: item.genreName,
                    label: item.genreName
                }));
                setGenres(formatted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    return { genres, loading, error };
}