import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BloodTypes({tkn}) {
  const [alltypes, setAlltypes] = useState([]);
  const [newtype, setnewtype] = useState('');
  const [updatedtype, setUpdatedtype] = useState('');
  const [editingId, setEditingId] = useState(null);
  

  useEffect(() => {
    getalltypes();
  }, []);

  const getalltypes = async () => {
  
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://front-intern.appssquare.com/api/admin/blood-types',
      headers: { 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${tkn}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      setAlltypes(response.data.data)
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
        data.append('name_ar',newtype.name_ar );
        data.append('name_en', newtype.name_en);
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://front-intern.appssquare.com/api/admin/blood-types',
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${tkn} `, 
          
        },
        data : data
      };

      await axios.request(config);
      getalltypes();
      console.log('Added new type');
      setnewtype({ name_en: '', name_ar: '' });
    } catch (error) {
      console.log('Error adding new type');
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://front-intern.appssquare.com/api/admin/blood-types/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tkn}`
        }
      });
      getalltypes();
      console.log(`Deleted reject with ID ${id}`);
    } catch (error) {
      console.log(`Error deleting reject with ID ${id}`);
      console.log(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
        const qs = require('qs')
        let data = qs.stringify({
            'name_en': updatedtype.name_en,
            'name_ar': updatedtype.name_ar 
          });
          
          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://front-intern.appssquare.com/api/admin/blood-types/${id}`,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization': `Bearer ${tkn}`
        },
        data: data
      };

      await axios.request(config);
      getalltypes();
      console.log(`Updated type with ID ${id}`);
      setEditingId(null);
      setUpdatedtype({name_en:'',name_en:''});
    } catch (error) {
      console.log(`Error updating type with ID ${id}`);
      console.log(error);
    }
  };
  const handleUpdatedtypeChange = (e, field) => {
    setUpdatedtype(prevState => ({
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
          {alltypes.map((typ, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>
                {editingId === typ.id ? (
                  <input
                    type="text"
                    value={updatedtype.name_en}
                    onChange={(e) => handleUpdatedtypeChange(e, 'name_en')}
                  />
                ) : (
                  typ.name_en
                )}
              </td>
              <td>
                {editingId === typ.id ? (
                  <input
                    type="text"
                    value={updatedtype.name_ar}
                    onChange={(e) => handleUpdatedtypeChange(e, 'name_ar')}
                  />
                ) : (
                  typ.name_ar
                )}
              </td>
              <td>
                {editingId === typ.id ? (
                  <button
                    type="button"
                    className={`btn btn-outline-info ${editingId === null ? 'update-btn' : ''}`}
                    onClick={() => handleUpdate(typ.id)}
                  >
                   update
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`btn btn-outline-info ${editingId === null ? 'edit-btn' : ''}`}
                    onClick={() => setEditingId(typ.id)}
                  >
                    {editingId === null ? 'Edit' : 'update'}
                  </button>
                )}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => handleDelete(typ.id)}
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
          value={newtype.name_en}
          onChange={(e) => setnewtype({...newtype, name_en: e.target.value})}
        />
      <input
      className='ms-2 mb-2'
          type="text"
          value={newtype.name_ar}
          onChange={(e) => setnewtype({...newtype, name_ar: e.target.value})}
        />
         <button type="button" className="btn btn-outline-info ms-3 px-4" onClick={handleAdd}>
                  ADD
                </button>
      </div>
    </div>
  </div>
  )
}

