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
    const [criticFilter, setTop_critic_Filter] = useState('All'); // For Top critic filter
    const [rottenFilter, setRottenFilter] = useState('All'); // For Freshness filter

    const {loading, error, reviews} = useReviews(pageNumber,criticFilter,rottenFilter);

    useEffect(() => {
        if (inView) {
            console.log("In view!")
            setPageNumber(pageNumber => pageNumber + 1); //increase page
        }
    }, [inView]);

    useEffect(() => {
        const filters = {
            top_critic: criticFilter !== 'All' ? criticFilter : null,
            review_type: rottenFilter !== 'All' ? rottenFilter : null,
        };

        console.log("Filters changed:", filters);
        setPageNumber(1); 
    }, [criticFilter, rottenFilter]);

    const handleTop_critic_FilterChange = (e) => setTop_critic_Filter(e.target.value);

    const handleRottenChange = (e) => setRottenFilter(e.target.value);

    const handleResetFilters = () => {
        setTop_critic_Filter('All');
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
                            <select className="form-select" value={criticFilter} onChange={handleTop_critic_FilterChange}>
                                <option value="All">All critics</option>
                                <option value="True">Top Ones</option>
                                <option value="False">Normal critics</option>
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