import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ContactUs({tkn}) {
   const[getcontact,setgetcontact]= useState([])
    async function getContact(){

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://front-intern.appssquare.com/api/admin/contact-us',
  headers: { 
    'Accept': 'application/json', 
    'Authorization': `Bearer ${tkn} `
  }
};

axios.request(config)
.then((response) => {
    setgetcontact(response.data.data)
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

    }
    useEffect(() => {
        getContact();
      }, []);
  return (
    <div>
         <div className="container mt-5 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th> 
              <th scope="col">Email</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {getcontact.map((con, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>
                    {con.name}
                </td>
              
                <td>
                    {con.email}
                </td>
              
                <td>
                    {con.message}
                </td>
              

                
              </tr>
            ))}
          </tbody>
        </table>
       
       
      </div>
    </div>
  )
}
