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
    //const [reviews, setReviews] = useState([]);
    const [pageNumber, setPageNumber] = useState(1); //on first render page = 1, time to time increase it by one
    const { ref: refLastReview, inView } = useInView({});

    const {loading, error, reviews, hasMore} = useReviews(pageNumber);

    useEffect(() => {
        if (inView && hasMore) {
            console.log("In view")
        }
    }, [inView, hasMore]);

    return (
        <Layout>
            <LayoutNavbar>
                <Navbar/>
            </LayoutNavbar>
            <p>{loading && "Loading..." /*@TODO change to a real Spiner or something*/}</p>
            <p>{error && "Error..." /*@TODO change to a real message error*/}</p>
            <LayoutContent>
                <h1>Reviews: </h1>
                {reviews?.map((review, index) => {
                    if(reviews.length === index + 1)
                        return <Review ref={refLastReview} review={review} key={index}/>; //it is the last one
                    else{
                        return <Review review={review} key={index}/>; // it is not the last one
                    }
                })}
            </LayoutContent>
            <Footer/>
        </Layout>
    )
}

export default Reviews