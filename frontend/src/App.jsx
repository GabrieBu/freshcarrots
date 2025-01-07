import Layout from "./ui/Layout.jsx";
import LayoutNavbar from "./ui/LayoutNavbar.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Layout>
        <LayoutNavbar>
            <Navbar />
        </LayoutNavbar>
        <p>There will be content here!</p>
    </Layout>
  )
}

export default App
