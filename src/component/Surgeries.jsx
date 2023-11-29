import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Surgeries({tkn}) {
  const [allsurgeries, setallsurgeries] = useState([]);
  const [newsurgeries, setnewsurgeries] = useState('');
  const [updatedsurgery, setupdatedsurgery] = useState('');
  const [editingId, setEditingId] = useState(null);
  

  useEffect(() => {
    getallSurgeries();
  }, []);

  const getallSurgeries = async () => {
  
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://front-intern.appssquare.com/api/admin/surgeries',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${tkn}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setallsurgeries(response.data.data)
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
        data.append('name_ar', newsurgeries.name_ar);
        data.append('name_en', newsurgeries.name_en);
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://front-intern.appssquare.com/api/admin/surgeries',
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${tkn} `, 
          
        },
        data : data
      };

      await axios.request(config);
      getallSurgeries();
      console.log('Added new surgeries');
      setnewsurgeries({ name_en: '', name_ar: '' });
    } catch (error) {
      console.log('Error adding new surgeries');
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://front-intern.appssquare.com/api/admin/surgeries/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tkn}`
        }
      });
      getallSurgeries();
      console.log(`Deleted surgery with ID ${id}`);
    } catch (error) {
      console.log(`Error deleting surgery with ID ${id}`);
      console.log(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
        const qs = require('qs');
        let data = qs.stringify({
          'name_ar': updatedsurgery.name_ar,
          'name_en': updatedsurgery.name_en 
        });
        
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: `https://front-intern.appssquare.com/api/admin/surgeries/${id}`,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization': `Bearer ${tkn}`
        },
        data: data
      };

      await axios.request(config);
      getallSurgeries();
      console.log(`Updated surgery with ID ${id}`);
      setEditingId(null);
      setupdatedsurgery({name_en:'',name_en:''});
    } catch (error) {
      console.log(`Error updating surgery with ID ${id}`);
      console.log(error);
    }
  };
  const handleupdatedsurgeryChange = (e, field) => {
    setupdatedsurgery(prevState => ({
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
          {allsurgeries.map((rej, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>
                {editingId === rej.id ? (
                  <input
                    type="text"
                    value={updatedsurgery.name_en}
                    onChange={(e) => handleupdatedsurgeryChange(e, 'name_en')}
                  />
                ) : (
                  rej.name_en
                )}
              </td>
              <td>
                {editingId === rej.id ? (
                  <input
                    type="text"
                    value={updatedsurgery.name_ar}
                    onChange={(e) => handleupdatedsurgeryChange(e, 'name_ar')}
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
          value={newsurgeries.name_en}
          onChange={(e) => setnewsurgeries({...newsurgeries, name_en: e.target.value})}
        />
      <input
      className='ms-2 mb-2'
          type="text"
          value={newsurgeries.name_ar}
          onChange={(e) => setnewsurgeries({...newsurgeries, name_ar: e.target.value})}
        />
         <button type="button" className="btn btn-outline-info ms-3 px-4" onClick={handleAdd}>
                  ADD
                </button>
      </div>
    </div>
  </div>
  )
}
