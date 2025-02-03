function Footer() {
  return (
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            </div>
            <div className="col-md-4">
              <h5>Follow Us</h5>
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
