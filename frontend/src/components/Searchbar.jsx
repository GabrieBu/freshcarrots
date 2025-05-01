import {lazy, useState} from "react";
import useSearch from "../hooks/useSearch.js";
import { Link } from "react-router-dom";

const Loader = lazy(() => import("./../ui/Loader"));

function Searchbar() {
    const [query, setQuery] = useState('');
    const { moviesSearched, loading, error } = useSearch(query);

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className="input-group position-relative">
            <input
                type="text"
                className="form-control"
                placeholder="Search for a movie..."
                value={query}
                onChange={handleSearch}
            />
            <button className="btn btn-outline-secondary" type="button">Search</button>
            {error && <h2 className="text-danger">Error searching movies</h2>}
            {moviesSearched?.length > 0 && (
                <ul className="list-group position-absolute w-100 overflow-auto"
                    style={{
                        zIndex: 1000,
                        top: '100%',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        background: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '5px'
                    }}>
                    {!loading ? (
                        moviesSearched?.map((movie) => (
                            <Link to={`/movie/${movie?.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
                                <li key={movie?.id} className="list-group-item d-flex align-items-center">
                                    <img
                                        src={movie?.poster}
                                        className="rounded-2 me-3"
                                        style={{ width: '50px', height: '75px' }}
                                        alt={movie?.name}
                                    />
                                    <div className="d-flex flex-column justify-content-between">
                                        <div>
                                            <h4 className="text-bold mb-0">{movie?.name}</h4>
                                        </div>
                                        <div>
                                            <p className="text-secondary mb-0"> {movie?.year}</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))
                    ) : <Loader />}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;
