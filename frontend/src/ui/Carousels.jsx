import Carousel from "../components/Carousel.jsx";
import useMoviesByCategory from "../hooks/useMoviesByCategory.js";

const hotGenres = [
    {
        genre: "Action",
        title: "🔥 High-Octane Thrills",
    },
    {
        genre: "Drama",
        title: "🎭 Captivating Dramas",
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
    }
];

function Carousels() {
    const { moviesByCategory, loading } = useMoviesByCategory(hotGenres);
    const {moviesByGenre, moviesForAdult, moviesForFamilies, worldwideMovies,cultLanguageMovies} = moviesByCategory;


    /* TODO HANDLING ERROR*/
    return (
        <div className="container mt-4">
            <div className="row g-4">
                {hotGenres.map((item) => (
                    <div key={item.genre} className="col-12 mb-2">
                        <Carousel title={item.title} movies={moviesByGenre[item.genre] || []} loading={loading}/>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Carousel title="🌍 Cult Classics in Their Original Language" movies={cultLanguageMovies} loading={loading}/>
            </div>
            <div className="mt-4">
                <Carousel title="🔞 PG-18: Only for Adults" movies={moviesForAdult} loading={loading}/>
            </div>
            <div className="mt-4">
                <Carousel title="🌎 Trending Worldwide Hits" movies={worldwideMovies} loading={loading}/>
            </div>
            <div className="mt-4">
                <Carousel title="👨‍👩‍👧‍👦 Fun for the Whole Family" movies={moviesForFamilies}/>
            </div>
        </div>
    );
}

export default Carousels;