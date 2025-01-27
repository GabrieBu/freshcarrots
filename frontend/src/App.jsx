import {BrowserRouter, Routes, Route} from "react-router-dom";

/* @TODO add lazy import*/

import Homepage from "./pages/Homepage";
import Community from "./pages/Community";
import Reviews from "./pages/Reviews";
import DiscussionRoom from "./pages/DiscussionRoom.jsx";
import Movie from "./components/Movie.jsx";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="home" element={<Homepage />}/>
              <Route path="community" element={<Community />}/>
              <Route path="reviews" element={<Reviews />}/>
              <Route path="/discussion/:id" element={<DiscussionRoom />} />
              <Route path="/movie" element={<Movie />}/>
              <Route path="*" element={<p>Page not Found! Error 404</p>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
