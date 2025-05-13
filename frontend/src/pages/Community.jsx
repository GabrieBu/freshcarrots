import { lazy} from "react";
import Footer from "../components/Footer.jsx";

const DiscussionList = lazy(() => import("../components/DiscussionList"));
const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Navbar = lazy(() => import("../components/Navbar"));

function Community() {
  return (
      <>
          <Navbar />
          <LayoutContent>
            <DiscussionList />
          </LayoutContent>
          <Footer />
      </>
  );
}
export default Community;
