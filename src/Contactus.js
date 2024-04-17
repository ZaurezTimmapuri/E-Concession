import React, { useState } from 'react';
import './Contactus.css'

function Contactus() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        query: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., sending data to a server.
        console.log(formData);
      };
    
  return (
    <div className="text-box-contactus">
    <form onSubmit={handleSubmit} className='contact'>
      <h1>Contact Us</h1>

      <label >Name:</label>
      <input className='label'type="text" name="name" value={formData.name} onChange={handleChange} />

      <label >Email:</label>
      <input className='label' type="email" name="email" value={formData.email} onChange={handleChange} />

      <label >Queries:</label>
      <textarea className='label'name="query" value={formData.query} onChange={handleChange} rows="3" />
      <br/>
      <button type="submit" className='button'>Submit</button>
    </form>
  </div>
  )
}
export default Contactus ;