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
        name: formData.name,
        mail: formData.mail,
        phone: formData.phone
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add customer');
    }

    // Clear form fields after successful submission
    setFormData({
      name: '',
      mail: '',
      phone: ''
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
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="mail">mail:</label>
        <input
          type="text"
          name="mail"
          value={formData.mail}
          onChange={handleInputChange}
        />

        <label htmlFor="phone">phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default InputForm;
