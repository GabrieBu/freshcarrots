import { useState } from "react";
import useSearch from "../hooks/useSearch.js";
import Loader from "../ui/Loader.jsx";

function Searchbar() {
    const [query, setQuery] = useState('');

    const {moviesSearched, loading, error} = useSearch(query)

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
                <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, top: '100%' }}>
                    {!loading ? moviesSearched?.map(movie => (
                        <li key={movie?.id} className="list-group-item d-flex align-items-center">
                            <img
                                src={movie?.link}
                                className="rounded-2 me-3"
                                style={{ width: '50px', height: '75px' }}
                                alt={movie?.name}
                            />
                            <div>
                                <h6 className="mb-0">{movie?.name}</h6>
                            </div>
                        </li>
                    )) : <Loader />}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;
