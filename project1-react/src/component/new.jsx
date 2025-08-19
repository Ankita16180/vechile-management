import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MediaCard from './cardlist';

function Add() {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    regNumber: '',
    brand: '',
    type: '',
    city: ''
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Add new card to state
    setCards(prev => [...prev, formData]);

    // Clear form
    setFormData({
      regNumber: '',
      brand: '',
      type: '',
      city: ''
    });
  }

  function handleCancel(event) {
    event.preventDefault();
    console.log("Cancelled");
  }

  return (
    <>
      <h4>Add Vehicle</h4>
      <form onSubmit={handleSubmit}>
        <label>Registration number:</label><br />
        <TextField
          variant="filled"
          name="regNumber"
          value={formData.regNumber}
          onChange={handleChange}
          required
        /><br />

        <label>Vehicle Brand:</label><br />
        <TextField
          variant="filled"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        /><br />

        <label>Vehicle Type:</label><br />
        <TextField
          variant="filled"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        /><br />

        <label>City:</label><br />
        <TextField
          variant="filled"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        /><br />

        <Button variant="contained" type='submit'>Add</Button>
        <Button variant="contained" onClick={handleCancel}>Cancel</Button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {cards.map((card, index) => (
          <MediaCard
            key={index}
            regNumber={card.regNumber}
            brand={card.brand}
            type={card.type}
            city={card.city}
          />
        ))}
      </div>
    </>
  );
}

export default Add;
