import Carousel from "../components/Carousel.jsx";

const hotGenres = ["Action", "Adventure", "Comedy", "Drama"];

function Carousels(){
    return (
        <div className="container mt-4">
            <div className="row g-4">
                {hotGenres.map((genre, index) => (
                    <div key={index} className="col-12 mb-4">
                        <Carousel key={index} genre={genre}/>
                    </div>
                ))}
            </div>
        </div>
    )}

export default Carousels;