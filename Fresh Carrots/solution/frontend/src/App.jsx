import {BrowserRouter, Routes, Route} from "react-router-dom";
import {lazy} from "react";

const Homepage = lazy(() => import("./pages/Homepage"));
const Community = lazy(() => import("./pages/Community"));
const Reviews = lazy(() => import("./pages/Reviews"));
const DiscussionRoom = lazy(() => import("./pages/DiscussionRoom"));
const Movie = lazy(() => import("./pages/Movie"));
const Discover = lazy(() => import("./pages/Discover"));


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />}/>
                <Route path="home" element={<Homepage />}/>
                <Route path="community" element={<Community />}/>
                <Route path="reviews" element={<Reviews />}/>
                <Route path="discover" element={<Discover />}/>
                <Route path="/discussion/:id" element={<DiscussionRoom />} />
                <Route path="/movie/:id" element={<Movie />}/>
                <Route path="*" element={<p>Page not Found! Error 404</p>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
