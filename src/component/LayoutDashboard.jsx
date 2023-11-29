import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

export default function LayoutDashbord({tkn}) {
  return (
    <div>
        <Sidebar tkn={tkn} />
      <Outlet />
      
    </div>
  );
}
