import React, { useState } from 'react';

function InputForm() {
  const [formData, setFormData] = useState({
    id: '',
    fname: '',
    lname: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://127.0.0.1:8000/input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        costumer_id: formData.id,
        costumer_name: formData.fname,
        last_name: formData.lname
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add customer');
    }

    // Clear form fields after successful submission
    setFormData({
      id: '',
      fname: '',
      lname: ''
    });

    console.log('Customer added successfully');
  } catch (error) {
    console.error('Error adding customer:', error);
  }
};

  return (
    <div>
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
        />

        <label htmlFor="fname">First Name:</label>
        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleInputChange}
        />

        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleInputChange}
        />

        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default InputForm;
