import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const permissionLevel = localStorage.getItem("permissionLevel");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uID");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("permissionLevel");

    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid p-2 ">
          <a className="navbar-brand " href="#">
            JOB FINDER
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNavAltMarkup "
          >
            <div className="navbar-nav">
              <a className="nav-link active me-4" aria-current="page" href="#">
                <Link to="/">
                  <button class="btn btn-primary me-4" type="button">
                    Home
                  </button>
                </Link>
              </a>

              {localStorage.getItem("permissionLevel") == "COMPANY" ? (
                <a
                  className="nav-link active me-4"
                  aria-current="page"
                  href="#"
                >
                  <Link to="/company">
                    <button class="btn btn-primary me-4" type="button">
                      Dashboard
                    </button>
                  </Link>
                </a>
              ) : (
                <></>
              )}

              {localStorage.getItem("permissionLevel") == "ADMIN" ? (
                <a
                  className="nav-link active me-4"
                  aria-current="page"
                  href="#"
                >
                  <Link to="/admin">
                    <button class="btn btn-primary me-4" type="button">
                      Dashboard
                    </button>
                  </Link>
                </a>
              ) : (
                <></>
              )}

              {localStorage.getItem("permissionLevel") == "APPLICANT" ? (
                <a
                  className="nav-link active me-4"
                  aria-current="page"
                  href="#"
                >
                  <Link to="/applicant">
                    <button class="btn btn-primary me-4" type="button">
                      Dashboard
                    </button>
                  </Link>
                </a>
              ) : (
                <></>
              )}

              {localStorage.getItem("token") ? (
                <a className="nav-link active" href="#">
                  <button
                    class="btn btn-primary me-4"
                    type="button"
                    onClick={logout}
                  >
                    Log Out
                  </button>
                </a>
              ) : (
                <>
                  <a className="nav-link active" href="#">
                    <Link to="/company/login">
                      <button class="btn btn-primary me-4" type="button">
                        Company Login
                      </button>
                    </Link>
                  </a>

                  <a className="nav-link active" href="#">
                  <Link to="/user/login">
                    <button class="btn btn-primary me-4" type="button">
                      Applicant Login
                    </button>
                    </Link>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
