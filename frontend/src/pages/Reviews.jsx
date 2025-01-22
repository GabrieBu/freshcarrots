import {lazy, useEffect, useState} from "react";
import axios from "axios";

const Layout = lazy(() => import("../ui/Layout"));
const LayoutNavbar = lazy(() => import("../ui/LayoutNavbar"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));
const Review = lazy(() => import("../components/Review"));

const reviewsApiUrl = "http://localhost:3000/getReviews";
function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await axios.get(reviewsApiUrl);
                setReviews(response.data);
            } catch (error) {
                console.error("Error:", error.message);
            }
        }
        console.log(`Query sent to ${reviewsApiUrl} waiting`);
        fetchReviews();
    }, []);

    return (
        <Layout>
            <LayoutNavbar>
                <Navbar />
            </LayoutNavbar>
            <LayoutContent>
                <h1>Reviews:</h1>
                {reviews?.map((review, index) => <Review review={review} key={index}/>)}
            </LayoutContent>
            <Footer />
        </Layout>
    )
}
export default Reviews