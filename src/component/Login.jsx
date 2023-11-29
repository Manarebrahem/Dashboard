import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  
  const handleLogin = (event) => {
    event.preventDefault();
    // Prepare login data
    
  
   
    const loginData = {
      email: email,
      password: password,
    };

    // Send login request
    axios
      .post("https://front-intern.appssquare.com/api/admin/login", loginData)
      .then((response) => {
        // Handle login response
        console.log(response.data);
        console.log(response.data.token);
        
        localStorage.setItem("tkn", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        if (response.data.message === "Login Successfully") {
          $(".sucmsg").fadeIn(2000, function () {
            navigate("/LayoutDashbord/Home");
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        $(".errmsg").fadeIn(1000, function () {
          setTimeout(() => {
            $(".errmsg").fadeOut(500);
          }, 3000);
        });
      });
  };
  useEffect(() => {
    return () => {
      // Cleanup function
      $(".errmsg").fadeOut(500);
      $(".sucmsg").fadeOut(500);
    };
  }, [])
  return (
    <div>
      <div
        style={{ display: "none" }}
        className=" errmsg alert alert-info text-center mt-5 "
      >
        Email or Password Incorrect
      </div>
      <div
        style={{ display: "none" }}
        className=" sucmsg alert alert-info text-center mt-5"
      >
        congatrulations
      </div>
      <div className="d-flex justify-content-center  vh-100 flex-column align-items-center">
        <div className="mb-3 row container text-center ">
          <label for="staticEmail" className="col-sm-2 col-form-label fs-5">
            Email
          </label>
          <div className="col-sm-10">
            <input
              onChange={handleEmailChange}
              type="text"
              required
              className="form-control"
              id="staticEmail"
            />
          </div>
        </div>
        <div className="mb-4 row container text-center">
          <label
            for="inputPassword"
            className="col-sm-2 col-form-label fs-5 ps-3"
          >
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              onChange={handlePasswordChange}
              className="form-control"
              id="inputPassword"
            />
          </div>
        </div>
        <div className="mb-4 row container text-center mx-auto mt-5">
          <div className="col-sm-12 ">
            <button className="btn btn-outline-info px-4 " onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
