import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Visits({ tkn }) {
  const [getvisit, setgetvisit] = useState([]);
  const [updatedvisit, setUpdatedvisit] = useState("");
  const [editingId, setEditingId] = useState(null);
  async function getVisits() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://front-intern.appssquare.com/api/admin/visits",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tkn}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setgetvisit(response.data.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getVisits();
  }, []);
  const handleUpdate = async (id) => {
    try {
      const FormData = require("form-data");
      let data = new FormData();
      data.append("_method", "put");
      data.append("slug", updatedvisit.slug);
      data.append("min_price", updatedvisit.min_price);
      data.append("max_price", updatedvisit.max_price);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://front-intern.appssquare.com/api/admin/visits/${id}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
          "Content-Type": "multipart/form-data",
        },
        
      };

      await axios.request(config);
      getVisits();
      console.log(`Updated  with ID ${id}`);
      setEditingId(null);
      setUpdatedvisit("");
    } catch (error) {
      console.log(`Error updating  with ID ${id}`);
      console.log(error);
    }
  };
  const handleUpdatedvisitChange = (e, field) => {
    setUpdatedvisit(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };
  return (
    <div>
      <div>
        <div className="container mt-5 p-4">
          <table className="table">
            <thead>
              <tr>
              <th scope="col">id</th>
                <th scope="col">Slug</th>
                <th scope="col">min_price</th>
                <th scope="col">max_price</th>
                <th scope="col"></th>
                
              </tr>
            </thead>
            <tbody>
              {getvisit.map((visit, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>
                    {editingId === visit.id ? (
                      <input
                        type="text"
                        value={updatedvisit.slug}
                        onChange={(e) => handleUpdatedvisitChange(e, 'slug')}
                        />
                    ) : (
                      visit.slug
                    )}
                  </td>
                  <td> {editingId === visit.id ? (
                      <input
                        type="text"
                        value={updatedvisit.min_price}
                        onChange={(e) => handleUpdatedvisitChange(e, 'min_price')}
                        />
                    ) : (
                      visit.min_price
                    )}</td>
                  <td> {editingId === visit.id ? (
                      <input
                        type="text"
                        value={updatedvisit.max_price}
                        onChange={(e) => handleUpdatedvisitChange(e, 'max_price')}
                        />
                    ) : (
                      visit.max_price
                    )}</td>
                  <td>
                    {editingId === visit.id ? (
                      <button
                        type="button"
                        className={`btn btn-outline-info ${
                          editingId === null ? "update-btn" : ""
                        }`}
                        onClick={() =>handleUpdate(visit.id)}
                      >
                        update
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`btn btn-outline-info ${
                          editingId === null ? "edit-btn" : ""
                        }`}
                        onClick={() => setEditingId(visit.id)}
                      >
                        {editingId === null ? "Edit" : "update"}
                      </button>
                    )}
                  </td>
         
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
