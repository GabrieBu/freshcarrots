import { lazy} from "react";

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
      </>
  );
}
export default Community;
