import {useState} from "react";

function HeroSection() {
    /* @TODO
    *    query, compute and return THIS top 5 rated movies*/
    const topFilms = [
        {
            link_image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "City Lights",
            description: "A breathtaking visual of a city that never sleeps."
        },
        {
            link_image: "https://plus.unsplash.com/premium_photo-1671650125917-4cef01cd7574?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "The Journey Begins",
            description: "An epic adventure of a traveler exploring the unknown lands."
        },
        {
            link_image: "https://images.unsplash.com/photo-1656489782764-443559c29211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Silent Reflections",
            description: "A deep introspective journey into the mind of a lonely artist."
        },
        {
            link_image: "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Echoes of the Past",
            description: "A historical drama unfolding the secrets of an ancient civilization."
        },
        {
            link_image: "https://images.unsplash.com/photo-1539672332343-fd36f8c27cde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Beyond the Horizon",
            description: "An emotional story of love, loss, and the pursuit of dreams."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade w-100 vh-100" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {topFilms.map((_, index) => (
                    <li
                        key={index}
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === currentIndex ? "active" : ""}
                    ></li>
                ))}
            </div>

            <div className="carousel-inner h-100">
                {topFilms.map((movie, index) => (
                    <div key={index} className={`carousel-item h-100 ${index === currentIndex ? "active" : ""}`}>
                        <img src={movie?.link_image} className="d-block w-100 h-100 object-fit-cover"
                             alt={`Slide ${index + 1}`}/>
                        <div className="carousel-caption d-none d-md-block">
                            <h3>{movie?.title}</h3>
                            <h5>{movie?.description}</h5>
                        </div>
                    </div>))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1) % topFilms.length)}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % topFilms.length)}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default HeroSection;
