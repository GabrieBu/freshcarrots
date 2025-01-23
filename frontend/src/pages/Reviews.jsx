import {lazy, useState, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import useReviews from "../hooks/useReviews.js";

const Layout = lazy(() => import("../ui/Layout"));
const LayoutNavbar = lazy(() => import("../ui/LayoutNavbar"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));
const Review = lazy(() => import("../components/Review"));

function Reviews() {
    const [pageNumber, setPageNumber] = useState(1); //on first render page = 0, time to time increase it by one
    const { ref, inView } = useInView({});
    const [genreFilter, setGenreFilter] = useState('All'); // For genre filter
    const [rottenFilter, setRottenFilter] = useState('All'); // For date filter

    const {loading, error, reviews} = useReviews(pageNumber,genreFilter,rottenFilter);

    useEffect(() => {
        if (inView) {
            console.log("In view!")
            setPageNumber(pageNumber => pageNumber + 1); //increase page
        }
    }, [inView]);

    useEffect(() => {
        const filters = {
            genre: genreFilter !== 'All' ? genreFilter : null,
            date: rottenFilter !== 'All' ? rottenFilter : null,
        };

        console.log("Filters changed:", filters);
        setPageNumber(1); 
    }, [genreFilter, rottenFilter]);

    const handleGenreChange = (e) => setGenreFilter(e.target.value);

    const handleRottenChange = (e) => setRottenFilter(e.target.value);

    const handleResetFilters = () => {
        setGenreFilter('All');
        setRottenFilter('All');
    };


    return (
        <Layout>
            <LayoutNavbar>
                <Navbar/>
            </LayoutNavbar>

            <p>{error && "Error..." /*@TODO change to a real message error*/}</p>
            <LayoutContent>
                <h1>Reviews: </h1>
                <div className="bg-light p-3 mb-4 shadow-sm rounded" style={{ border: "1px solid #ccc" }}>
                    <div className="row gy-2">
                        <div className="col-md-3">
                            <select className="form-select" value={genreFilter} onChange={handleGenreChange}>
                                <option value="All">All Genres</option>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Horror">Horror</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select"  value={rottenFilter} onChange={handleRottenChange}>
                                <option value="All">All Types</option>
                                <option value="Rotten">Rotten</option>
                                <option value="Rotten">Fresh</option>
                            </select>
                        </div>
                        <div className="col-md-2 text-end">
                            <button className="btn btn-outline-secondary" onClick={handleResetFilters}>
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
                {reviews?.map((review, index) => <Review review={review} key={index}/>)}
            </LayoutContent>
            {
                loading &&
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            }
            <div ref={ref}></div>
            <Footer/>
        </Layout>
    )
}

export default Reviews