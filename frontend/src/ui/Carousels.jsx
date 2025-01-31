import Carousel from "../components/Carousel.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const hotGenres = ["Action", "Drama", "Adventure", "Comedy"];
function Carousels() {
    const [moviesByGenre, setMoviesByGenre] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all(hotGenres.map(genre => {
            return fetchMoviesForGenre(genre);
        }))
            .then(results => {
                const moviesObj = results.reduce((acc, {genre, movies}) => {
                    acc[genre] = movies;
                    return acc;
                }, {});
                setMoviesByGenre(moviesObj);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    async function fetchMoviesForGenre(genre){
        try {
            const response = await axios.get('http://localhost:3000/topRated', {
                params: {genre}
            });
            return { genre, movies: response.data };
        } catch (error) {
            console.error(`Error fetching movies for genre: ${genre}`, error);
            return { genre, movies: [] };
        }
    }

    return (
        <div className="container mt-4">
            <div className="row g-4">
                {hotGenres.map((genre) => (
                    <div key={genre} className="col-12 mb-2">
                        <Carousel genre={genre} movies={moviesByGenre[genre] || []} loading={loading}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousels;