import {lazy} from "react";

const Layout = lazy(() => import("../ui/Layout"));
const LayoutNavbar = lazy(() => import("../ui/LayoutNavbar"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));
const HeroSection = lazy(() => import("../components/HeroSection"));
const Carousels = lazy(() => import("../ui/Carousels"));


function Homepage() {

    return (
        <Layout>
            <LayoutNavbar>
                <Navbar />
            </LayoutNavbar>
            <HeroSection />
            <LayoutContent>
                <Carousels />
            </LayoutContent>
            <Footer />
        </Layout>
    );
}

export default Homepage;