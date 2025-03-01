import {Link} from "react-router-dom";


// eslint-disable-next-line react/prop-types
function MovieCard({movie: {id, link, name}}){
    // eslint-disable-next-line react/prop-types
    return <Link to={`/movie/${id}`}>
        <div
            className="movie-card"
        >
            <img src={link} alt={name}/>
            <p>{name}</p>
        </div>
    </Link>
}

export default MovieCard