import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Diseases({tkn}) {
  const [alldiseases, setAllDiseases] = useState([]);
  const [newdiseases, setnewdiseases] = useState('');
  const [updateddiseases, setupdateddiseases] = useState('');
  const [editingId, setEditingId] = useState(null);
  

  useEffect(() => {
    getalldiseases();
  }, []);

  const getalldiseases = async () => {
  
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://front-intern.appssquare.com/api/admin/diseases',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${tkn}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setAllDiseases(response.data.data)
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const handleAdd = async () => {
    try {
        let data = new FormData();
        data.append('name_ar', newdiseases.name_ar);
        data.append('name_en', newdiseases.name_en);
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://front-intern.appssquare.com/api/admin/diseases',
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${tkn} `, 
          
        },
        data : data
      };

      await axios.request(config);
      getalldiseases();
      console.log('Added new disease');
      setnewdiseases({ name_en: '', name_ar: '' });
    } catch (error) {
      console.log('Error adding new disease');
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://front-intern.appssquare.com/api/admin/diseases/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tkn}`
        }
      });
      getalldiseases();
      console.log(`Deleted disease with ID ${id}`);
    } catch (error) {
      console.log(`Error deleting disease with ID ${id}`);
      console.log(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
        const qs = require('qs');
        let data = qs.stringify({
          'name_en': updateddiseases.name_en,
          'name_ar': updateddiseases.name_ar 
        });
        
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: `https://front-intern.appssquare.com/api/admin/diseases/${id}`,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization': `Bearer ${tkn}`
        },
        data: data
      };

      await axios.request(config);
      getalldiseases();
      console.log(`Updated disease with ID ${id}`);
      setEditingId(null);
      setupdateddiseases({name_en:'',name_en:''});
    } catch (error) {
      console.log(`Error updating disease with ID ${id}`);
      console.log(error);
    }
  };
  const handleupdateddiseasesChange = (e, field) => {
    setupdateddiseases(prevState => ({
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
          {alldiseases.map((disea, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>
                {editingId === disea.id ? (
                  <input
                    type="text"
                    value={updateddiseases.name_en}
                    onChange={(e) => handleupdateddiseasesChange(e, 'name_en')}
                  />
                ) : (
                  disea.name_en
                )}
              </td>
              <td>
                {editingId === disea.id ? (
                  <input
                    type="text"
                    value={updateddiseases.name_ar}
                    onChange={(e) => handleupdateddiseasesChange(e, 'name_ar')}
                  />
                ) : (
                  disea.name_ar
                )}
              </td>
              <td>
                {editingId === disea.id ? (
                  <button
                    type="button"
                    className={`btn btn-outline-info ${editingId === null ? 'update-btn' : ''}`}
                    onClick={() => handleUpdate(disea.id)}
                  >
                   update
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`btn btn-outline-info ${editingId === null ? 'edit-btn' : ''}`}
                    onClick={() => setEditingId(disea.id)}
                  >
                    {editingId === null ? 'Edit' : 'update'}
                  </button>
                )}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => handleDelete(disea.id)}
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
          value={newdiseases.name_en}
          onChange={(e) => setnewdiseases({...newdiseases, name_en: e.target.value})}
        />
      <input
      className='ms-2 mb-2'
          type="text"
          value={newdiseases.name_ar}
          onChange={(e) => setnewdiseases({...newdiseases, name_ar: e.target.value})}
        />
         <button type="button" className="btn btn-outline-info ms-3 px-4" onClick={handleAdd}>
                  ADD
                </button>
      </div>
    </div>
  </div>
  )
}

