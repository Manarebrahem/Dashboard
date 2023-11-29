import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Department({tkn}) {
   const[getdeparts,setgetdeparts]= useState([])
    async function getDepart(){

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://front-intern.appssquare.com/api/admin/departments',
  headers: { 
    'Accept': 'application/json', 
    'Authorization': `Bearer ${tkn} `
  }
};

axios.request(config)
.then((response) => {
    setgetdeparts(response.data.data)
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

    }
    useEffect(() => {
        getDepart();
      }, []);
  return (
    <div>
         <div className="container mt-5 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              
            </tr>
          </thead>
          <tbody>
            {getdeparts.map((depart, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>
                    {depart.name}
                </td>
              

                
              </tr>
            ))}
          </tbody>
        </table>
       
       
      </div>
    </div>
  )
}
