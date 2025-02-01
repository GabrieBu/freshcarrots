import {Link} from "react-router-dom";
import Searchbar from "./Searchbar.jsx";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100" aria-label="Main navigation">
            <div className="container-fluid">
                <Link to="/home" ><img style={{ width: "90px", height: "auto"  }} src="\freshcarrots-high-resolution-logo-transparent.svg" className="img-fluid" aria-label="Logo" alt="Logo"/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/discover">Discover</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/community">Community</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reviews">Reviews</Link>
                        </li>
                    </ul>
                    <div className="w-50">
                        <Searchbar/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
