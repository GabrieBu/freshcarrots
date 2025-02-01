import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export default function useMoviesByCategory(hotGenres) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [moviesByCategory, setMoviesByCategory] = useState({
        moviesByGenre: {},
        moviesForAdult: [],
        moviesForFamilies: [],
        worldwideMovies: [],
        cultLanguageMovies: []
    });

    const fetchMovies = useCallback(async (endpoint, params = {}) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`, { params });
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return [];
        }
    }, []);

    useEffect(() => {
        const fetchAllMovies = async () => {
            setLoading(true);
            try {
                const [genreResults, adultMovies, familiesMovies,worldwideMovies, cultMovies] = await Promise.all([
                    Promise.all(hotGenres.map(genre => fetchMovies("topRated", { genre }))),
                    fetchMovies("ageMin", { age_min: "18" }),
                    fetchMovies("ageMin", { age_min: "2" }),
                    fetchMovies("getWorldwideMovies"),
                    fetchMovies("getCultLanguage")
                ]);

                const moviesByGenre = hotGenres.reduce((acc, genre, index) => {
                    acc[genre] = genreResults[index] || [];
                    return acc;
                }, {});

                setMoviesByCategory({
                    moviesByGenre,
                    moviesForAdult: adultMovies,
                    moviesForFamilies: familiesMovies,
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
    }, []); //deps vuote = only on first mount

    return {
        moviesByCategory,
        loading,
        error
    };
}
