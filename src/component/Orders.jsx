import axios from "axios";
import React, { useEffect, useState } from "react";
export default function Orders({ tkn }) {
  const [getorder, setgetorder] = useState([]);
  

  async function getOrders() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://front-intern.appssquare.com/api/admin/orders",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tkn}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
        setgetorder(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getOrders();
  }, []);
  const handleChange = async (id) => {
    setgetorder((prevOrders) =>
      prevOrders.map((ord) =>
        ord.id === id ? { ...ord, payment_status: 5 } : ord
      )
    );
  };
  return (
    <div>
      <div className="container mt-5 p-4">
        <table className="table-responsive">
          <thead>
            <tr>
              <th scope="col" className="pe-3">id</th>
              <th scope="col" className="pe-3">patient_name</th>
              <th scope="col" className="pe-3">partner_name</th>
              <th scope="col" className="pe-3">Time</th>
              <th scope="col" className="pe-3">Day</th>
              <th scope="col" className="pe-3">Date</th>
              <th scope="col" className="pe-3">visit_price</th>
              <th scope="col" className="pe-3">visit_type</th>
              <th scope="col" className="pe-3">Canceld by</th>
              <th scope="col" className="pe-3">Payment status</th>
            </tr>
          </thead>
          <tbody>
            {getorder.map((ord, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td className="pe-3">{ord.patient_name}</td>
                <td className="pe-3">{ord.partner_name}</td>
                <td className="pe-3">{ord.time}</td>
                <td className="pe-3">{ord.day}</td>
                <td className="pe-3">{ord.date}</td>
                <td className="pe-3">{ord.visit_price}</td>
                <td className="pe-3">{ord.visit_type}</td>
                <td className="pe-3">{ord.canceled_by}</td>
                <td className="pe-3">
                 {ord.payment_status===2 && ord.visit_type==='video_call' ?<button  onClick={() => handleChange(ord.id)} className="btn btn-outline-info">Confirm</button> : 'confirmed' }   
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
