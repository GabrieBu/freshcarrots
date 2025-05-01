import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useDiscussions() {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `http://localhost:3000/getDiscussions`,
        })
            .then((res) => {
                setDiscussions(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    return { discussions, setDiscussions, loading, error };
}