
import React from "react";
import { Navigate } from "react-router-dom";


const Homee = (isLoggedIn) => {
    // const navigate = useNavigate();
 
  return (
    <div>
        
      {isLoggedIn===true ? (
     <Navigate to='/LayoutDashbord/home' replace={true} /> 
      ) : (
        <Navigate to='/login' replace={true} /> 
        )}
    </div>
  );
};

export default Homee;
  

