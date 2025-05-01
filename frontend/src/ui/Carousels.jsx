import useMoviesByCategory from "../hooks/useMoviesByCategory.js";
import {lazy} from "react";
const Carousel = lazy(() => import("../components/Carousel"));

const hotGenres = [
    {
        genre: "Action",
        title: "🔥 High-Octane Thrills",
    },
    {
        genre: "Adventure",
        title: "🌍 Epic Adventures Await",
    },
    {
        genre: "Documentary",
        title: "📖 True Stories & Insights",
    },
    {
        genre: "Romance",
        title: "❤️ Love & Heartfelt Moments",
    },
    {
        genre: "Drama",
        title: "🎭 Captivating Dramas",
    }
];
const languageMap = {
    'en': 'English',
    'fr': 'French',
    'it': 'Italian',
    'de': 'German',
    'es': 'Spanish',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'zh': 'Chinese',
    'ja': 'Japanese',
    'ko': 'Korean',
};

function Carousels() {
    const { moviesByCategory, loading, error } = useMoviesByCategory(hotGenres);
    const {moviesByGenre, moviesForAdult, worldwideMovies,cultLanguageMovies} = moviesByCategory;
    const userLanguage = languageMap[navigator.language.substring(0, 2)]; //getting dynamically the language of the user, to query db

    return (
        error ?
            <div>
                <h4 className="text-danger">Could not be possible to load one or more carousel. Please try again later.</h4>
            </div> :
        <div className="container mt-4">
            <div className="row g-4">
                {hotGenres.map((item) => (
                    <div key={item.genre} className="col-12 mb-2">
                        <Carousel title={item.title} movies={moviesByGenre[item.genre] || []} loading={loading}/>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Carousel title={`🌍 Cult Classics in ${userLanguage}`} movies={cultLanguageMovies} loading={loading}/>
            </div>
            <div className="mt-4">
                <Carousel title="🔞 PG-18: Only for Adults" movies={moviesForAdult} loading={loading}/>
            </div>
            <div className="mt-4">
                <Carousel title="🌎 Trending Worldwide Hits" movies={worldwideMovies} loading={loading}/>
            </div>
        </div>
    );
}

export default Carousels;
