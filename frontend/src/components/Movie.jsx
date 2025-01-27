function Movie() {
    //generated movie to test
    const movie = {
        title: "Inception",
        tagline: "Your mind is the scene of the crime.",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the task of implanting an idea into the mind of a CEO.",
        poster: "https://m.media-amazon.com/images/I/51k4nFv1v3L._AC_SY679_.jpg", // Poster image URL
        crew: ["Christopher Nolan (Director)", "Emma Thomas (Producer)", "Hans Zimmer (Composer)"],
        studios: ["Warner Bros.", "Syncopy"],
        languages: ["English", "Japanese", "French"],
        actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
        duration: 148,
        rating: 8.8,
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={movie?.link}
                        alt={movie?.name}
                        className="img-fluid rounded shadow-lg"
                    />
                </div>
                <div className="col-md-8">
                    <h1 className="display-4 font-weight-bold">{movie?.name}</h1>
                    <p className="lead text-muted">{movie?.tagline}</p>
                    <p className="text-justify">{movie?.description}</p>

                    <div className="d-flex justify-content-between mb-4">
                        <div className="badge badge-pill badge-primary">{movie?.minute} min | {movie?.date}</div>
                        <div className="badge badge-pill badge-warning">{`Rating: ${movie?.rating}/5`}</div>
                    </div>

                    <h5>Directed by:</h5>
                    <ul className="list-unstyled">
                        {movie?.crew.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>

                    <h5>Studios:</h5>
                    <ul className="list-unstyled">
                        {movie?.studios.map((studio, index) => (
                            <li key={index}>{studio}</li>
                        ))}
                    </ul>

                    <h5>Languages:</h5>
                    <ul className="list-unstyled">
                        {movie?.languages.map((language, index) => (
                            <li key={index}>{language}</li>
                        ))}
                    </ul>

                    <h5>Actors:</h5>
                    <ul className="list-unstyled">
                        {movie?.actors.map((actor, index) => (
                            <li key={index}>{actor}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Movie;
