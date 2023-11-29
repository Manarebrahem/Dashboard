import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Rejectreasons({tkn}) {
  const [allreject, setAllreject] = useState([]);
  const [newreject, setNewreject] = useState('');
  const [updatedreject, setUpdatedreject] = useState('');
  const [editingId, setEditingId] = useState(null);
  

  useEffect(() => {
    getallreject();
  }, []);

  const getallreject = async () => {
  
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://front-intern.appssquare.com/api/admin/reject-reasons',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${tkn}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setAllreject(response.data.data)
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const handleAdd = async () => {
    try {
      const FormData = require('form-data');
      let data = new FormData();
      data.append('name_en', newreject.name_en);
      data.append('name_ar', newreject.name_ar);
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://front-intern.appssquare.com/api/admin/reject-reasons',
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${tkn} `, 
          
        },
        data : data
      };

      await axios.request(config);
      getallreject();
      console.log('Added new degree');
      setNewreject({ name_en: '', name_ar: '' });
    } catch (error) {
      console.log('Error adding new degree');
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://front-intern.appssquare.com/api/admin/reject-reasons/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tkn}`
        }
      });
      getallreject();
      console.log(`Deleted reject with ID ${id}`);
    } catch (error) {
      console.log(`Error deleting reject with ID ${id}`);
      console.log(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
      const qs = require('qs');
      let data = qs.stringify({
        'name_en': updatedreject.name_en,
        'name_ar': updatedreject.name_ar
      });
      
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `https://front-intern.appssquare.com/api/admin/reject-reasons/${id}`,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization': `Bearer ${tkn}`
        },
        data: data
      };

      await axios.request(config);
      getallreject();
      console.log(`Updated degree with ID ${id}`);
      setEditingId(null);
      setUpdatedreject({name_en:'',name_ar:''});
    } catch (error) {
      console.log(`Error updating degree with ID ${id}`);
      console.log(error);
    }
  };
  const handleUpdatedrejectChange = (e, field) => {
    setUpdatedreject(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };
  return (
    <div>
    <div className="container mt-5 p-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name_en</th>
            <th scope="col">Name_ar</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {allreject.map((rej, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>
                {editingId === rej.id ? (
                  <input
                    type="text"
                    value={updatedreject.name_en}
                    onChange={(e) => handleUpdatedrejectChange(e, 'name_en')}
                  />
                ) : (
                  rej.name_en
                )}
              </td>
              <td>
                {editingId === rej.id ? (
                  <input
                    type="text"
                    value={updatedreject.name_ar}
                    onChange={(e) => handleUpdatedrejectChange(e, 'name_ar')}
                  />
                ) : (
                  rej.name_ar
                )}
              </td>
              <td>
                {editingId === rej.id ? (
                  <button
                    type="button"
                    className={`btn btn-outline-info ${editingId === null ? 'update-btn' : ''}`}
                    onClick={() => handleUpdate(rej.id)}
                  >
                   update
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`btn btn-outline-info ${editingId === null ? 'edit-btn' : ''}`}
                    onClick={() => setEditingId(rej.id)}
                  >
                    {editingId === null ? 'Edit' : 'update'}
                  </button>
                )}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => handleDelete(rej.id)}
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
      className='mb-2'
          type="text"
          value={newreject.name_en}
          onChange={(e) => setNewreject({...newreject, name_en: e.target.value})}
        />
      <input
      className='ms-2 mb-2'
          type="text"
          value={newreject.name_ar}
          onChange={(e) => setNewreject({...newreject, name_ar: e.target.value})}
        />
         <button type="button" className="btn btn-outline-info ms-3 px-4" onClick={handleAdd}>
                  ADD
                </button>
      </div>
    </div>
  </div>
  )
}