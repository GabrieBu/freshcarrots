import {useState} from "react";
import useHeroSection from "../hooks/useHeroSection.js";
import Skeleton from "../ui/Skeleton.jsx";
import {useNavigate} from "react-router-dom";


function HeroSection() {
    const {movies, loading, error} = useHeroSection();
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    function handleClickCarousel(id_film) {
        navigate(`http://localhost:5173/movie/${id_film}"`);
    }

    return (
        error ? <h1 className="text-danger">Error loading Top 5 movies. Try again later...</h1>
                :
        <div id="carouselExampleFade" className="carousel slide carousel-fade w-100 vh-100" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {movies?.map((_, index) => (
                    <li
                        key={index}
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === currentIndex ? "active" : ""}
                    ></li>
                ))}
            </div>

            {/* @TODO insert navigate(/movie/:id/ taken from movie?.id */}
            <div className="carousel-inner h-100">
                {movies?.map((movie, index) => (
                    <div key={index} className={`carousel-item h-100 ${index === currentIndex ? "active" : ""}`} onClick={() => handleClickCarousel(movie?.id)}>
                        <img src={movie?.link} className="d-block w-100 h-100 object-fit-cover"
                             alt={`Slide ${index + 1}`}/>
                        <div className="carousel-caption d-none d-md-block">
                            {loading ? <Skeleton value={4} /> : <h3>{movie?.name}</h3>}
                            {loading ? <Skeleton velue={4}/> : <h5>{movie?.rating}</h5>}
                        </div>
                    </div>))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1) % movies.length)}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default HeroSection;
