import { useState } from "react";

function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleSearch = (event) => {
       /* @TODO query to main server*/
    };

    return (
        <div className="input-group position-relative">
            <input
                type="text"
                className="form-control"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={handleSearch}
            />
            <button className="btn btn-outline-secondary" type="button">Search</button>

            {filteredMovies.length > 0 && (
                <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, top: '100%' }}>
                    {filteredMovies.map(movie => (
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
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;
