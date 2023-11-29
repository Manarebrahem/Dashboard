import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Sidebar({ tkn }) {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogOut = async (event) => {
    console.log("kk");
    event.preventDefault();
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://front-intern.appssquare.com/api/admin/logout",
        headers: {
          Accept: "js",
          Authorization: `Bearer ${tkn}`,
        },
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data.message));
      if ((response.data.message = "Logout Successfully")) {
        setIsLoggedOut(true);
        console.log("mnn");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isLoggedOut) {
      console.log("pp");
      navigate("/Login");
    }
  }, [isLoggedOut, navigate]);
  return (
    <>
      <nav className="navbar bg-body-info">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <img src={require("../images/logo.png.webp")} alt="" srcset="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Dashboard
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/LayoutDashbord/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/LayoutDashbord/Scientificdegree"
                  >
                    Scientific Degree
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/LayoutDashbord/ScientificTitle"
                  >
                    Scientific Title
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LayoutDashbord/Department">
                    Departments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LayoutDashbord/Visits">
                    Visits
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LayoutDashbord/Orders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LayoutDashbord/Rejectreasons">
                    Reject Reasons
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LayoutDashbord/BloodTypes">
                    Blood Types
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LayoutDashbord/Diseases">
                    Diseases
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LayoutDashbord/Allergies">
                    Allergies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LayoutDashbord/Surgeries">
                    Surgeries
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LayoutDashbord/AboutUS">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/LayoutDashbord/ContactUs">
                    Contact Us
                  </Link>
                </li>
              </ul>
              <form className="d-flex mt-3" role="search">
                <button className="btn btn-outline-info" onClick={handleLogOut}>
                  LogOut
                </button>
                {isLoggedOut && <p>You have been logged out.</p>}
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
