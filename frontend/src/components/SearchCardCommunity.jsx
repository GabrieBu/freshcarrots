function SearchCardCommunity({onSelectMovie, movie}) {
    return (
        <li key={movie?.id} className="list-group-item d-flex align-items-center" onClick={() => onSelectMovie(movie)}>
            <div className="d-flex align-items-center w-100 text-decoration-none text-dark">
                <img
                    src={movie?.poster}
                    className="rounded-2 me-3"
                    style={{width: '50px', height: '75px', objectFit: 'cover'}}
                    alt={movie?.name}
                />
                <div>
                    <h6 className="mb-0">{movie?.name}</h6>
                    <small className="text-secondary">{movie?.year}</small>
                </div>
            </div>
        </li>
    )
}

export default SearchCardCommunity;