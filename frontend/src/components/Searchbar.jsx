import { lazy, useState } from "react";
import useSearch from "../hooks/useSearch.js";
import { Link } from "react-router-dom";

const Loader = lazy(() => import("./../ui/Loader"));

function Searchbar() {
    const [query, setQuery] = useState(''); // state for movie title query of the user
    const { moviesSearched, loading, error } = useSearch(query); //hook returns top 20 result searching by title

    const handleSearch = (event) => {
        setQuery(event.target.value); // update movie title query
        /*
        * each time query changes, the hook is re-triggered and results returned again
        * */
    };

    //display results box if query is not blank
    const showDropdown = query.trim().length > 0;

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

            {showDropdown && (
                <ul
                    className="list-group position-absolute w-100"
                    style={{
                        zIndex: 1000,
                        top: '100%',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        background: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '5px'
                    }}
                >
                    {loading ? (
                        <li className="list-group-item text-center py-3">
                            <Loader />
                        </li>
                    ) : error ? (
                        <li className="list-group-item text-danger text-center py-2">
                            Error searching movies
                        </li>
                    ) : moviesSearched.length === 0 ? (
                        <li className="list-group-item text-center py-2 text-muted">
                            No results found
                        </li>
                    ) : (
                        moviesSearched.map((movie) => (
                            <li
                                key={movie?.id}
                                className="list-group-item d-flex align-items-center"
                            >
                                <Link
                                    to={`/movie/${movie?.id}`}
                                    className="d-flex align-items-center w-100 text-decoration-none text-dark"
                                >
                                    <img
                                        src={movie?.poster}
                                        className="rounded-2 me-3"
                                        style={{ width: '50px', height: '75px', objectFit: 'cover' }}
                                        alt={movie?.name}
                                    />
                                    <div>
                                        <h6 className="mb-0">{movie?.name}</h6>
                                        <small className="text-secondary">{movie?.year}</small>
                                    </div>
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;
