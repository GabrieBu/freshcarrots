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

    const {loading, error, reviews} = useReviews(pageNumber);

    useEffect(() => {
        if (inView) {
            console.log("In view!")
            setPageNumber(pageNumber => pageNumber + 1); //increase page
        }
    }, [inView]);

    return (
        <Layout>
            <LayoutNavbar>
                <Navbar/>
            </LayoutNavbar>

            <p>{error && "Error..." /*@TODO change to a real message error*/}</p>
            <LayoutContent>
                <h1>Reviews: </h1>
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