import {lazy, useEffect} from "react";
import axios from "axios";

const Layout = lazy(() => import("../ui/Layout"));
const LayoutNavbar = lazy(() => import("../ui/LayoutNavbar"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));

function Community() {
    const first_url = "http://localhost:3000/";

    useEffect(() => {
        function sendAxiosQuery(url) {
            axios.get(url)
                .then (function (dataR) {
                    console.log("Received first data: " + dataR.data);
                })
                .catch(function (error) {
                    console.error("Error:", error.message);
                });
        }
        console.log(`Query sent to ${first_url} waiting`);
        sendAxiosQuery(first_url);
    }, []);

    return (
        <Layout>
            <LayoutNavbar>
                <Navbar />
            </LayoutNavbar>
            <LayoutContent>
                <p>Content</p>
            </LayoutContent>
            <Footer />
        </Layout>
    );
}
export default Community