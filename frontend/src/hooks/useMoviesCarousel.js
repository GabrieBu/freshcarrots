import {useEffect, useState} from "react";
import axios from "axios";

function useMoviesCarousel(genre){
    console.log("Genre in hook: " + genre)
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `http://localhost:3000/topRated`,
            params: {
                genre: genre
            }
            })
            .then((res) => {
                setMovies(res.data);
                console.log(movies);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, [movies, genre]);

    return { movies, loading, error };
}

export default useMoviesCarousel;