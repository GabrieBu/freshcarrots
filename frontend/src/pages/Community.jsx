import { lazy} from "react";

const Layout = lazy(() => import("../ui/Layout"));
const LayoutNavbar = lazy(() => import("../ui/LayoutNavbar"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Footer = lazy(() => import("../components/Footer"));
const Navbar = lazy(() => import("../components/Navbar"));

function Community() {
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
export default Community;
