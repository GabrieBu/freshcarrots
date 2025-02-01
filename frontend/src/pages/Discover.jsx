import Footer from "../components/Footer.jsx";
import LayoutContent from "../ui/LayoutContent.jsx";
import Layout from "../ui/Layout.jsx";
import LayoutNavbar from "../ui/LayoutNavbar.jsx";
import Navbar from "../components/Navbar.jsx";
import {useState} from "react";
import MovieCard from "../components/MovieCard.jsx";
import useMovies from "../hooks/useMovies.js";

const genres = ["Action", "Comedy", "Drama"]

function Discover() {
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isOpenOrder, setIsOpenOrder] = useState(false);
    const [isOpenGenre, setIsOpenGenre] = useState(false);

    const {movies, loading, error} = useMovies();

    function handleFilterChange(event) {
        const { value, checked } = event.target;
        setSelectedFilters((prev) =>
            checked ? [...prev, value] : prev.filter((filter) => filter !== value)
        );
        setPageNumber(1);
    }

    return (
    <Layout>
        <LayoutNavbar>
            <Navbar/>
        </LayoutNavbar>
        <LayoutContent>
            <h1>All movies: </h1>
            <div className="bg-light p-3 mb-4 shadow-sm rounded" style={{border: "1px solid #ccc"}}>
                <div className="row gy-2">
                    <div className="col-md-2">
                        <label htmlFor="orderBy" className="form-label">Order By:</label>
                        <div className="dropdown">
                            <button
                                id="orderBy"
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                onClick={() => setIsOpenOrder(!isOpenOrder)}
                            >
                                Select
                            </button>
                            <div className={`dropdown-menu p-3 ${isOpenOrder ? "show" : ""}`}
                                 style={{minWidth: "200px"}}>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="oldestToNewest"
                                        className="form-check-input"
                                        value="oldestToNewest"
                                        checked={selectedFilters.includes("oldestToNewest")}
                                        onChange={handleFilterChange}
                                    />
                                    <label htmlFor="oldestToNewest" className="form-check-label">
                                        From oldest to newest
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="newestToOldest"
                                        className="form-check-input"
                                        value="newestToOldest"
                                        checked={selectedFilters.includes("newestToOldest")}
                                        onChange={handleFilterChange}
                                    />
                                    <label htmlFor="newestToOldest" className="form-check-label">
                                        From newest to oldest
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="aToZ"
                                        className="form-check-input"
                                        value="aToZ"
                                        checked={selectedFilters.includes("aToZ")}
                                        onChange={handleFilterChange}
                                    />
                                    <label htmlFor="aToZ" className="form-check-label">
                                        From A-Z
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="zToA"
                                        className="form-check-input"
                                        value="zToA"
                                        checked={selectedFilters.includes("zToA")}
                                        onChange={handleFilterChange}
                                    />
                                    <label htmlFor="zToA" className="form-check-label">
                                        From Z-A
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="orderByGenre" className="form-label">Genre:</label>
                        <div className="dropdown">
                            <button
                                id="orderByGenre"
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                onClick={() => setIsOpenOrder(!isOpenOrder)}
                            >
                                Select
                            </button>
                            <div className={`dropdown-menu p-3 ${isOpenOrder ? "show" : ""}`}
                                 style={{minWidth: "200px"}}>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="oldestToNewest"
                                        className="form-check-input"
                                        value="allGenres"
                                        checked={selectedFilters.includes("oldestToNewest")}
                                        onChange={handleFilterChange}
                                    />
                                    <label htmlFor="oldestToNewest" className="form-check-label">
                                        From oldest to newest
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="newestToOldest"
                                        className="form-check-input"
                                        value="newestToOldest"
                                        checked={selectedFilters.includes("newestToOldest")}
                                        onChange={handleFilterChange}
                                    />
                                    <label htmlFor="newestToOldest" className="form-check-label">
                                        From newest to oldest
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="aToZ"
                                        className="form-check-input"
                                        value="aToZ"
                                        checked={selectedFilters.includes("aToZ")}
                                        onChange={handleFilterChange}
                                    />
                                    <label htmlFor="aToZ" className="form-check-label">
                                        From A-Z
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="zToA"
                                        className="form-check-input"
                                        value="zToA"
                                        checked={selectedFilters.includes("zToA")}
                                        onChange={handleFilterChange}
                                    />
                                    <label htmlFor="zToA" className="form-check-label">
                                        From Z-A
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <button className="btn btn-outline-secondary">
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {movies?.map((movie) => (
                    <div key={movie.id} className="col">
                        <MovieCard movie={movie}/>
                    </div>
                ))}
            </div>
        </LayoutContent>
        <Footer/>
    </Layout>
    )
}

export default Discover;