import {lazy, useEffect, useState} from "react";
import { useInView } from "react-intersection-observer";

const Layout = lazy(() => import("../ui/Layout"));
const LayoutNavbar = lazy(() => import("../ui/LayoutNavbar"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));
const HeroSection = lazy(() => import("../components/HeroSection"));
const Carousels = lazy(() => import("../ui/Carousels"));


function Homepage() {
    const [showNav, setShowNav] = useState(false);
    console.log(inView)

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.75, //trigger when 3/4 already scrolled
    });

    useEffect(() => {
        if (inView) {
            setShowNav(true);
        } else {
            setShowNav(false);
        }
    }, [inView]);


    return (
        <Layout>
            <LayoutNavbar>
                {showNav && <Navbar className={`navbar-transition ${showNav ? "show-navbar" : ""}`} />}
            </LayoutNavbar>
            <HeroSection ref={ref} />
            <LayoutContent>
                <Carousels />
            </LayoutContent>
            <Footer />
        </Layout>
    );
}

export default Homepage;