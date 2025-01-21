import {lazy} from "react";

const Layout = lazy(() => import("../ui/Layout"));
const LayoutNavbar = lazy(() => import("../ui/LayoutNavbar"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Cards = lazy(() => import("../components/Cards"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));
const HeroSection = lazy(() => import("../components/HeroSection"));


function Reviews() {

    const first_url = "http://localhost:3000/movies";

    useEffect(() => {
        function sendAxiosQuery(url) {
          axios
            .get(url)
            .then(function (dataR) {
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
            <HeroSection />
            <LayoutContent>
                <Cards />
            </LayoutContent>
            <Footer />
        </Layout>
    );
}

export default Reviews;