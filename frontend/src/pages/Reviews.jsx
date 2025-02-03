import {lazy, useState, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import useReviews from "../hooks/useReviews.js";

const Layout = lazy(() => import("../ui/Layout"));
const Loader = lazy(() => import("../ui/Loader"));
const LayoutNavbar = lazy(() => import("../ui/LayoutNavbar"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));
const Review = lazy(() => import("../components/Review"));

function Reviews() {
    const [pageNumber, setPageNumber] = useState(1); //on first render page = 0, time to time increase it by one
    const [criticFilter, setCriticFilter] = useState("all_critics");
    const [typeFilter, setTypeFilter] = useState("all_types");
    const [minDateFilter, setMinDate] = useState("all_dates");
    const [maxDateFilter, setMaxDate] = useState("all_dates");
    const [reviewMovieFilter, setReviewMovieFilter] = useState("");
    const {loading, error, reviews, hasMore} = useReviews(pageNumber,criticFilter,typeFilter, minDateFilter, maxDateFilter, reviewMovieFilter);
    const { ref, inView } = useInView({});

    useEffect(() => {
        if (inView && hasMore) {
            setPageNumber(pageNumber => pageNumber + 1); //increase page
        }
    }, [inView, hasMore]);

    useEffect(() => {
        setPageNumber(1); //restore to first page
    }, [criticFilter, typeFilter, minDateFilter, maxDateFilter, reviewMovieFilter]);

    const handleCriticFilterChange = (event) => {
        setCriticFilter(event.target.value);
    };

    const handleRottenChange = (event) => {
        setTypeFilter(event.target.value);
    };

    const handleMinDate = (event) => {
        setMinDate(event.target.value);
    };

    const handleMaxDate = (event) => {
        setMaxDate(event.target.value);
    };
    const handleSearch = (event) => {
        setReviewMovieFilter(event.target.value);
    };

    const handleResetFilters = () => {
        setCriticFilter("all_critics");
        setTypeFilter("all_types");
        setMinDate("all_dates");
        setMaxDate("all_dates");
        setReviewMovieFilter("");
    };

    return (
        <Layout>
            <LayoutNavbar>
                <Navbar/>
            </LayoutNavbar>
            {error && <h2 className="text-danger">Server is not responding 404. Try again later...</h2>}
            <LayoutContent>
                <h1>Reviews: </h1>
                <div className="bg-light p-3 mb-4 shadow-sm rounded" style={{ border: "1px solid #ccc" }}>
                    <div className="row gy-2">
                        <div className="col-md-2">
                            <label htmlFor="criticFilter" className="form-label">Critic:</label>
                            <select id="criticFilter" className="form-select" value={criticFilter}
                                    onChange={handleCriticFilterChange}>
                                <option value="all_critics">All</option>
                                <option value="True">Top</option>
                                <option value="False">Normal</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="typeFilter" className="form-label">Type:</label>
                            <select id="typeFilter" className="form-select" value={typeFilter}
                                    onChange={handleRottenChange}>
                                <option value="all_types">All</option>
                                <option value="Rotten">Rotten</option>
                                <option value="Fresh">Fresh</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="minDateFilter" className="form-label">From date:</label>
                            <input id="minDateFilter" type="date" className="form-control" value={minDateFilter}
                                   onChange={handleMinDate}/>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="maxDateFilter" className="form-label">To date:</label>
                            <input id="maxDateFilter" type="date" className="form-control" value={maxDateFilter}
                                   onChange={handleMaxDate}/>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="ReviewMovieFilter" className="form-label">Name movie:</label>
                            <input id="ReviewMovieFilter" type="text" className="form-control" value={reviewMovieFilter}
                            placeholder="Search movie title"  onChange={handleSearch}/>
                        </div>
                        <div className="col-md-2"> 
                        <button className="btn btn-outline-secondary" onClick={handleResetFilters}>
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
                {reviews?.map((review, index) => <Review review={review} key={index}/>)}
            </LayoutContent>
            {
                loading && <Loader/>
            }
            <div ref={ref}></div>
            <Footer/>
        </Layout>
    )
}

export default Reviews