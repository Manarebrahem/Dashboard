import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Allergies({tkn}) {
  const [allAllergies, setallAllergies] = useState([]);
  const [newAllergies, setnewAllergies] = useState('');
  const [updatedallergies, setupdatedallergies] = useState('');
  const [editingId, setEditingId] = useState(null);
  

  useEffect(() => {
    getallallergies();
  }, []);

  const getallallergies = async () => {
  
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://front-intern.appssquare.com/api/admin/allergies',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${tkn}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setallAllergies(response.data.data)
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
        data.append('name_ar', newAllergies.name_ar);
        data.append('name_en', newAllergies.name_en);
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://front-intern.appssquare.com/api/admin/allergies',
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${tkn} `, 
          
        },
        data : data
      };

      await axios.request(config);
      getallallergies();
      console.log('Added new degree');
      setnewAllergies({ name_en: '', name_ar: '' });
    } catch (error) {
      console.log('Error adding new degree');
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://front-intern.appssquare.com/api/admin/allergies/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tkn}`
        }
      });
      getallallergies();
      console.log(`Deleted allregies with ID ${id}`);
    } catch (error) {
      console.log(`Error deleting allregies with ID ${id}`);
      console.log(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
        const qs = require('qs');
        let data = qs.stringify({
          'name_ar': updatedallergies.name_ar,
          'name_en': updatedallergies.name_en 
        });
        
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: `https://front-intern.appssquare.com/api/admin/allergies/${id}`,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization': `Bearer ${tkn}`
        },
        data: data
      };

      await axios.request(config);
      getallallergies();
      console.log(`Updated degree with ID ${id}`);
      setEditingId(null);
      setupdatedallergies({name_en:'',name_en:''});
    } catch (error) {
      console.log(`Error updating degree with ID ${id}`);
      console.log(error);
    }
  };
  const handleupdatedallergiesChange = (e, field) => {
    setupdatedallergies(prevState => ({
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
          {allAllergies.map((alle, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>
                {editingId === alle.id ? (
                  <input
                    type="text"
                    value={updatedallergies.name_en}
                    onChange={(e) => handleupdatedallergiesChange(e, 'name_en')}
                  />
                ) : (
                  alle.name_en
                )}
              </td>
              <td>
                {editingId === alle.id ? (
                  <input
                    type="text"
                    value={updatedallergies.name_ar}
                    onChange={(e) => handleupdatedallergiesChange(e, 'name_ar')}
                  />
                ) : (
                  alle.name_ar
                )}
              </td>
              <td>
                {editingId === alle.id ? (
                  <button
                    type="button"
                    className={`btn btn-outline-info ${editingId === null ? 'update-btn' : ''}`}
                    onClick={() => handleUpdate(alle.id)}
                  >
                   update
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`btn btn-outline-info ${editingId === null ? 'edit-btn' : ''}`}
                    onClick={() => setEditingId(alle.id)}
                  >
                    {editingId === null ? 'Edit' : 'update'}
                  </button>
                )}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => handleDelete(alle.id)}
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
          value={newAllergies.name_en}
          onChange={(e) => setnewAllergies({...newAllergies, name_en: e.target.value})}
        />
      <input
      className='ms-2 mb-2'
          type="text"
          value={newAllergies.name_ar}
          onChange={(e) => setnewAllergies({...newAllergies, name_ar: e.target.value})}
        />
         <button type="button" className="btn btn-outline-info ms-3 px-4" onClick={handleAdd}>
                  ADD
                </button>
      </div>
    </div>
  </div>
  )
}
