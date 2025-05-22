import { useEffect, useState} from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

/*
* Hook used to get movies for carousels in Homepage
* */

export default function useMoviesByCategory(hotGenres, userLanguage) {
    console.log("in hook: ", userLanguage)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [moviesByCategory, setMoviesByCategory] = useState({
        moviesByGenre: {},
        moviesForAdult: [],
        worldwideMovies: [],
        cultLanguageMovies: []
    });

    const fetchMovies = async (endpoint, params = {}) => {
        console.log("params: ", params);
        try {
            // query to main server
            // params depending on carousel type
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`, { params });
            return response.data; //returns 20 movies
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return [];
        }
    }

    useEffect(() => {
        const fetchAllMovies = async () => {
            setLoading(true);
            try {
                const [genreResults, adultMovies,worldwideMovies, cultMovies] = await Promise.all([ //wait for 4 both carousels, then display (promises)
                    Promise.all(hotGenres.map((item) => fetchMovies("topRated", { genre: item?.genre }))),
                    fetchMovies("ageMin", { age_min: "18" }),
                    fetchMovies("getWorldwideMovies"),
                    fetchMovies("getCultLanguage", {language: userLanguage}) //dynamic fetch movies depending on user's language
                ]);

                //create a complex object, dict of
                const moviesByGenre = hotGenres.reduce((acc, item, index) => {
                    acc[item.genre] = genreResults[index] || [];
                    return acc;
                }, {});

                //set complex object to the local state
                setMoviesByCategory({
                    moviesByGenre,
                    moviesForAdult: adultMovies,
                    worldwideMovies,
                    cultLanguageMovies: cultMovies
                });
                setError(false);
            } catch (error) {
                console.log("Error fetching moviesByCategory", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAllMovies();
    }, []); //deps empty = only on first mount

    return {
        moviesByCategory,
        loading,
        error
    };
}