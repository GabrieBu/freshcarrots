function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
            <div className="container-fluid">
                <a className="navbar-brand">Logo che non ho ancora</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample05">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Voce 1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Voce 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Voce 3</a>
                        </li>
                    </ul>
                    <form role="search">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
