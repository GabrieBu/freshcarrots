import { lazy } from "react";

const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));
const HeroSection = lazy(() => import("../components/HeroSection"));
const Carousels = lazy(() => import("../ui/Carousels"));

function Homepage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LayoutContent>
        <Carousels />
      </LayoutContent>
      <Footer />
    </>
  );
}

export default Homepage;
