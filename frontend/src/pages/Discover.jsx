import Footer from "../components/Footer.jsx";
import LayoutContent from "../ui/LayoutContent.jsx";
import Layout from "../ui/Layout.jsx";
import LayoutNavbar from "../ui/LayoutNavbar.jsx";
import Navbar from "../components/Navbar.jsx";
import {useState} from "react";
import MovieCard from "../components/MovieCard.jsx";
import useMovies from "../hooks/useMovies.js";
import DropdownFilter from "../ui/DropdownFilter.jsx";

const filters = [{
        typeFilter: "title",
        options: [{
            name: "aToZ",
            label: "From A to Z"
        }, {
            name: "zToA",
            label: "From Z to A"
        }]
    },
    {
        typeFilter: "date",
        options: [{
            name: "newestToOldest",
            label: "From newest to oldest"
        }, {
            name: "oldestToNewest",
            label: "From oldest to newest"
        }]
    },
    {
        typeFilter: "rating",
        options: [{
            name: "zeroToOne",
            label: "[0-1]"
        }, {
            name: "oneToTwo",
            label: "[1-2]"
        },
        {
            name: "twoToThree",
            label: "[2-3]"
        },
        {
            name: "threeToFour",
            label: "[3-4]"
        },
        {
            name: "fourToFive",
            label: "[4-5]"
        }]
    }
]

function Discover() {
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const {movies} = useMovies();

    function handleResetFilter() {
        setSelectedFilters([]);
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
                    {filters.map((filter, index) => <DropdownFilter key={index} filterObj={filter} onSelectedFilters={selectedFilters} onSetSelectedFilters={setSelectedFilters} onSetPageNumber={setPageNumber}/>)}
                    <div className="col-md-2">
                        <button className="btn btn-outline-secondary" onClick={handleResetFilter}>
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