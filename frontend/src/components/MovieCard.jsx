import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function MovieCard({movie}){
    // eslint-disable-next-line react/prop-types
    return <Link to={`/movie/${movie?.id}`}>
        <div
            className="movie-card"
        >
            {/* eslint-disable-next-line react/prop-types */}
            <img src={movie?.link} alt={movie?.name}/>
            {/* eslint-disable-next-line react/prop-types */}
            <p>{movie?.name}</p>
        </div>
    </Link>
}

export default MovieCard