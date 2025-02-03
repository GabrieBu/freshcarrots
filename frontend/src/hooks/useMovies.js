import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useMovies(pageNumber, selectedFilters) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setMovies([]);
    }, [selectedFilters]);

    useEffect(() => {
        setLoading(true);
        let filter = {};

        selectedFilters.forEach(value => {
            if (value === "ascName") filter.orderByName = "asc";
            if (value === "descName") filter.orderByName = "desc";

            if (value === "ascDate") filter.orderByDate = "asc";
            if (value === "descDate") filter.orderByDate = "desc";

            if (["zeroToOne", "oneToTwo", "twoToThree", "threeToFour", "fourToFive"].includes(value)) {
                filter.byRating = value;
            }
            if (!filter.byRating && !filter.orderByName && !filter.orderByDate) {
                filter.genre = value;
            }
        });
        filter = {...filter, page: pageNumber};
        setError(false);
        axios({
            method: "GET",
            url: `http://localhost:3000/getFilteredMovies`,
            params: filter
        })
            .then((res) => {
                setMovies(prevMovies => [...prevMovies, ...res.data]);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, [pageNumber, selectedFilters]);

    return { movies, loadingMovies: loading, errorMovies: error };
}
