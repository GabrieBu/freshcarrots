import { lazy, useState } from "react";
import useSearch from "../hooks/useSearch.js";

const Loader = lazy(() => import("./../ui/Loader"));

/**
 * Searchbar component allowing users to search for movies by title.
 * Displays a dropdown list with search results that can be selected.
 *
 * @param {Object} props - Component props.
 * @param {function} props.onSelectMovie - Callback function called when a movie is selected from the dropdown.
 * @param {function} props.children - Render prop function to render each movie result.
 * @returns {JSX.Element} The Searchbar component JSX.
 */
function Searchbar({children, onSelectMovie}) {
    const [query, setQuery] = useState(''); // state for movie title query of the user
    const { moviesSearched, loading, error } = useSearch(query); //hook returns top 20 result searching by title

    /**
     * each time query changes, the hook is re-triggered and results returned again
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.
     */
    const handleSearch = (event) => {
        setQuery(event.target.value); // update movie title query
    };

    //display results box if query is not blank
    const showDropdown = query.trim().length > 0;

    const handleSelect = (movie) => {
        if (onSelectMovie) onSelectMovie(movie);
        setQuery(''); // close dropdown
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
                            <div key={movie.id} onClick={() => handleSelect(movie)} style={{ cursor: 'pointer' }}>
                                {children(movie)}
                            </div>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;
