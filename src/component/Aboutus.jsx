import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AboutUs({tkn}) {
   const[getsetting,setgetsetting]= useState([]);
   const [updatedsetting, setUpdatedsetting] = useState('');
  const [editingId, setEditingId] = useState(null);
  
    async function getSetting(){

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://front-intern.appssquare.com/api/admin/settings',
  headers: { 
    'Accept': 'application/json', 
    'Authorization': `Bearer ${tkn} `
  }
};

axios.request(config)
.then((response) => {
    setgetsetting(response.data.data)
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

    }
    useEffect(() => {
        getSetting();
      }, []);
      const handleUpdate = async (key) => {
        try {
            const qs = require('qs')
            let data = qs.stringify({
                'paragraph': 'man',
              });
              
              let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `https://front-intern.appssquare.com/api/settings/update`,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded', 
              'Authorization': `Bearer ${tkn}`
            },
            data: data
          };
    
          await axios.request(config);
          getSetting();
          console.log(`Updated setting with ID ${key}`);
          setEditingId(null);
          setUpdatedsetting({value:''});
        } catch (error) {
          console.log(`Error updating setting with ID`);
          console.log(error);
        }
      };
      handleUpdate()
      const handleUpdatedsettingChange = (e, field) => {
        setUpdatedsetting(prevState => ({
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
              <th className='text-center' scope="col">Paragraph</th> 
            </tr>
          </thead>
          <tbody>
            {getsetting.map((set, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>
                {editingId === set.key? (
                  <input
                    type="text"
                    value={updatedsetting.value}
                    onChange={(e) => handleUpdatedsettingChange(e, 'name_en')}
                  />
                ) : (
                  set.value
                )}
              </td>
              <td>
                {editingId === set.key ? (
                  <button
                    type="button"
                    className={`btn btn-outline-info ${editingId === null ? 'update-btn' : ''}`}
                    onClick={() => handleUpdate(set.key)}
                  >
                   update
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`btn btn-outline-info ${editingId === null ? 'edit-btn' : ''}`}
                    onClick={() => setEditingId(set.key)}
                  >
                    {editingId === null ? 'Edit' : 'update'}
                  </button>
                )}
              </td>
                
              </tr>
            ))}
          </tbody>
        </table>
       
       
      </div>
    </div>
  )
}
