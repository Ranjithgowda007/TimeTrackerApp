import React, { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/LoginContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
   
  })

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/Login");
      
    }
  }, [isLoggedIn, navigate]);

  // const handleLogout = () => {
  //   Swal.fire({
  //     title: 'Logout',
  //     text: 'Are you sure you want to logout?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Yes, logout'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       logout(); // Call the logout function from AuthContext
  //     }
  //   });
  // };


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {isLoggedIn && (
        <div className="container-fluid login">
          <div className="row vh-100">
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sidebar">
              <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100 sidebar">
                <Link
                  to="/"
                  className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none ms-4"
                >
                  <span className="fs-5 fw-bolder d-none d-sm-inline">
                    LOGO
                  </span>
                </Link>
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                  id="menu"
                >
                  <li className="w-100 mx-1 my-2">
                    <Link
                      to="/dashboard"
                      className="nav-link text-white px-0 align-middle"
                    >
                      <i className="fs-4 bi-speedometer2 ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  <li className="w-100 mx-1 my-2">
                    <Link
                      to="/employlist"
                      className="nav-link px-0 align-middle text-white"
                    >
                      <i className="fs-4 bi-people ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">
                        Employee List
                      </span>
                    </Link>
                  </li>
                  <li className="w-100 mx-1 my-2">
                    <button
                      className="nav-link px-0 w-100 text-white  d-flex align-items-center"
                      onClick={handleLogout}
                    >
                      <i className="fs-4 bi-power ms-2"></i>
                      <span className="ms-2 d-none d-sm-inline">LOGOUT</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col p-0 m-0 ">
              <Outlet />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
