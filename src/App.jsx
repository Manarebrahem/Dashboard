import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import Login from "./component/Login";
import Home from "./component/Home";

import Scientificdegree from "./component/Scientificdegree";
import ScientificTitle from "./component/ScientificTitle";

import Department from "./component/Department";
import Visits from "./component/Visits";
import Layout from "./component/Layout";
import Homee from "./component/Homee";
import Orders from "./component/Orders";
import Rejectreasons from "./component/Rejectreasons";
import BloodTypes from "./component/BloodTypes";
import Diseases from "./component/Diseases";
import Allergies from "./component/Allergies";
import Surgeries from "./component/Surgeries";
import LayoutDashbord from "./component/LayoutDashboard";
import ContactUs from "./component/ContactUs";
import Aboutus from "./component/Aboutus";

function App() {
  let tkn = localStorage.getItem("tkn");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const Router = createBrowserRouter([
    {
      path: "",
      element: <Layout/>,
      children: [
        {
          path: "LayoutDashbord",
          element: <LayoutDashbord tkn={tkn}/>,
          children: [
            
            { path: "ScientificTitle", element: <ScientificTitle tkn={tkn} /> },
            {  path: "scientificdegree", element: <Scientificdegree tkn={tkn} />},
            { path: "Department", element: <Department tkn={tkn} /> },
            { path: "Home", element: <Home tkn={tkn} /> },
            { path: "Visits", element: <Visits tkn={tkn} /> },
            { path: "Rejectreasons", element: <Rejectreasons tkn={tkn} /> },
            { path: "BloodTypes", element: <BloodTypes tkn={tkn} /> },
            { path: "Diseases", element: <Diseases tkn={tkn} /> },
            { path: "Allergies", element: <Allergies tkn={tkn} /> },
            { path: "Surgeries", element: <Surgeries tkn={tkn} /> },
            { path: "Orders", element: <Orders tkn={tkn} /> },
            { path: "ContactUs", element: <ContactUs tkn={tkn} /> },
            { path: "AboutUs", element: <Aboutus tkn={tkn} /> },
           
          ],
        },
        { path: "login", element: <Login /> },
        { path: "", element: <Homee isLoggedIn={isLoggedIn} /> },
       
      ],
    },
  ]);

  return <RouterProvider router={Router} />;
}

export default App;
