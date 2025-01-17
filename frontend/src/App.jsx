import Layout from "./ui/Layout.jsx";
import LayoutNavbar from "./ui/LayoutNavbar.jsx";
import LayoutContent from "./ui/LayoutContent.jsx";
import Navbar from "./components/Navbar.jsx";
import Cards from "./components/Cards.jsx";
import Footer from "./components/Footer.jsx";


function App() {
  return (
    <Layout>
        <LayoutNavbar>
            <Navbar />
        </LayoutNavbar>
        <LayoutContent>
            <Cards />
        </LayoutContent>
        <Footer />
    </Layout>
  )
}

export default App
