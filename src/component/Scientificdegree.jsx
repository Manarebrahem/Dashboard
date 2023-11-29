import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Scientificdegree({tkn}) {
  const [alldegree, setAllDegree] = useState([]);
  const [newDegree, setNewDegree] = useState('');
  const [updatedDegree, setUpdatedDegree] = useState('');
  const [editingId, setEditingId] = useState(null);
  

  useEffect(() => {
    getall();
  }, []);

  const getall = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://front-intern.appssquare.com/api/admin/scientific-degrees',
      headers: { 
        'Authorization': `Bearer ${tkn}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setAllDegree(response.data.data)
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
  };
  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newDegree);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://front-intern.appssquare.com/api/admin/scientific-degrees',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tkn}`,
          
        },
        data: formData
      };

      await axios.request(config);
      getall();
      console.log('Added new degree');
    } catch (error) {
      console.log('Error adding new degree');
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://front-intern.appssquare.com/api/admin/scientific-degrees/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tkn}`
        }
      });
      getall();
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
      formData.append('name', updatedDegree);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://front-intern.appssquare.com/api/admin/scientific-degrees/${id}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tkn}`,
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      };

      await axios.request(config);
      getall();
      console.log(`Updated degree with ID ${id}`);
      setEditingId(null);
      setUpdatedDegree('');
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
            {alldegree.map((deg, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>
                  {editingId === deg.id ? (
                    <input
                      type="text"
                      value={updatedDegree}
                      onChange={(e) => setUpdatedDegree(e.target.value)}
                    />
                  ) : (
                    deg.name
                  )}
                </td>
                <td>
                  {editingId === deg.id ? (
                    <button
                      type="button"
                      className={`btn btn-outline-info ${editingId === null ? 'update-btn' : ''}`}
                      onClick={() => handleUpdate(deg.id)}
                    >
                     update
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`btn btn-outline-info ${editingId === null ? 'edit-btn' : ''}`}
                      onClick={() => setEditingId(deg.id)}
                    >
                      {editingId === null ? 'Edit' : 'update'}
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
       
        <div className='text-center'>
        <input
            type="text"
            value={newDegree}
            onChange={(e) => setNewDegree(e.target.value)}
          />
           <button type="button" className="btn btn-outline-dark ms-3 px-4" onClick={handleAdd}>
                    ADD
                  </button>
        </div>
      </div>
    </div>
  );
}

export default Scientificdegree;
