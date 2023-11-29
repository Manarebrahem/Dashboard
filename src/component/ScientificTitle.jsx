import React, { useState, useEffect } from "react";
import axios from "axios";

function ScientificTitle({ tkn }) {
  const [allTitle, setallTitle] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [editingIdtittle, setEditingIdtittle] = useState(null);
  


  useEffect(() => {
    getalltitle();
  }, []);

  const getalltitle = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://front-intern.appssquare.com/api/admin/scientific-titles",
      headers: {
        Authorization: `Bearer ${tkn} `,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setallTitle(response.data.data);
        console.log(JSON.stringify(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newTitle);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://front-intern.appssquare.com/api/admin/scientific-titles",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
        },
        data: formData,
      };

      await axios.request(config);
      getalltitle();
      console.log("Added new title");
    } catch (error) {
      console.log("Error adding new title");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://front-intern.appssquare.com/api/admin/scientific-titles/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tkn}`,
          },
        }
      );
      getalltitle();
      console.log(`Deleted degree with ID ${id}`);
    } catch (error) {
      console.log(`Error deleting degree with ID ${id}`);
      console.log(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append('_method', 'put');
      formData.append('name', updatedTitle);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://front-intern.appssquare.com/api/admin/scientific-titles/${id}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tkn}`,
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      };

      await axios.request(config);
      getalltitle();
      setEditingIdtittle(null);
      setUpdatedTitle('');
      console.log(`Updated degree with ID ${id}`);
      setEditingIdtittle(null);
      setUpdatedTitle('');
    } catch (error) {
      console.log(`Error updating degree with ID ${id}`);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mt-5 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {allTitle.map((deg, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>
                  {editingIdtittle === deg.id ? (
                    <input
                      type="text"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                  ) : (
                    deg.name
                  )}
                </td>
                <td>
                  {editingIdtittle === deg.id ? (
                    <button
                      type="button"
                      className={`btn btn-outline-info ${editingIdtittle === null ? 'update-btn' : ''}`}
                      onClick={() => handleUpdate(deg.id)}
                    >
                     update
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`btn btn-outline-info ${editingIdtittle === null ? 'edit-btn' : ''}`}
                      onClick={() => setEditingIdtittle(deg.id)}
                    >
                      {editingIdtittle === null ? 'Edit' : 'update'}
                    </button>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => handleDelete(deg.id)}
                  >
                    Delete
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-dark ms-3 px-4"
            onClick={handleAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScientificTitle;
