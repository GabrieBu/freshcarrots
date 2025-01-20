import {lazy} from "react";

const Layout = lazy(() => import("../ui/Layout"));
const LayoutNavbar = lazy(() => import("../ui/LayoutNavbar"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Cards = lazy(() => import("../components/Cards"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));
const HeroSection = lazy(() => import("../components/HeroSection"));

function Reviews() {
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