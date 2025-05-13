import {useEffect, useState} from "react";
import axios from "axios";

export default function useDiscussions(pageNumber, movieFilter, sortByDate) {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError(false);

        const controller = new AbortController();

        axios({
            method: "GET",
            url: `http://localhost:3000/getDiscussions`,
            params: {
                page: pageNumber,
                movieFilter,
                sortByDate
            },
            signal: controller.signal
        })
            .then((res) => {
                const newDiscussions = res.data;

                setDiscussions((prev) =>
                    pageNumber === 1
                        ? newDiscussions  // if it's the first page, reset discussions
                        : [...prev, ...newDiscussions]  // else  append new discussions
                );

                setHasMore(newDiscussions?.length > 0); //update hasMore:

                setLoading(false);
            })
            .catch((err) => {
                if (axios.isCancel(err)) return;
                console.error(err);
                setError(true);
                setLoading(false);
            });

        return () => controller.abort();
    }, [pageNumber, movieFilter, sortByDate]);

    return { discussions, setDiscussions, loading, error, hasMore };
}
