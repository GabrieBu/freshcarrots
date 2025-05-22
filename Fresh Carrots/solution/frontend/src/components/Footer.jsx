function Footer() {
  return (
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>FreshCarrots is a collaborative chat platform built to connect students and streamline academic discussions in real time.</p>
            </div>
            <div className="col-md-4">
              <h5>Contact us </h5>
              <div>
                <a className="text-white text-decoration-none me-3">gabriele.buoso@edu.unito.it</a>
                <a className="text-white text-decoration-none">andrea.driza@edu.unito.it</a>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="mb-0">&copy; 2025 FreshCarrots. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
