import { lazy} from "react";
import DiscussionList from "../components/DiscussionList.jsx";

const LayoutContent = lazy(() => import("../ui/LayoutContent"));
const Navbar = lazy(() => import("../components/Navbar"));

function Community() {
  return (
      <>
          <Navbar />
          <LayoutContent>
            <DiscussionList />
          </LayoutContent>
      </>
  );
}
export default Community;
