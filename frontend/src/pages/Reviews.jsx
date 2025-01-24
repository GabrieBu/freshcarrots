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
    const [criticFilter, setCriticFilter] = useState("all_critics");
    const [typeFilter, setTypeFilter] = useState("all_types");

    const {loading, error, reviews, hasMore} = useReviews(pageNumber,criticFilter,typeFilter);

    useEffect(() => {
        if (inView && hasMore) {
            setPageNumber(pageNumber => pageNumber + 1); //increase page
        }
    }, [inView, hasMore]);

    useEffect(() => {
        setPageNumber(1); //restore to first page
    }, [criticFilter, typeFilter]);

    const handleCriticFilterChange = (event) => {
        setCriticFilter(event.target.value);
    };

    const handleRottenChange = (event) => {
        setTypeFilter(event.target.value);
    };

    const handleResetFilters = () => {
        setCriticFilter("all_critics");
        setTypeFilter("all_types");
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
                        <div className="col-md-3">
                            <label htmlFor="criticFilter" className="form-label">Critic:</label>
                            <select id="criticFilter" className="form-select" value={criticFilter}
                                    onChange={handleCriticFilterChange}>
                                <option value="all_critics">All</option>
                                <option value="True">Top</option>
                                <option value="False">Normal</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="typeFilter" className="form-label">Type:</label>
                            <select id="typeFilter" className="form-select" value={typeFilter} onChange={handleRottenChange}>
                                <option value="all_types">All</option>
                                <option value="Rotten">Rotten</option>
                                <option value="Fresh">Fresh</option>
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