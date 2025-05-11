import React, { useState } from 'react';
import axios from 'axios';
import './EventForm.css';

const EventForm = ({ onEventAdd }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    reminder: false
  });

  const handleInputChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/events', newEvent)
      .then((response) => {
        onEventAdd(response.data);
        setNewEvent({ title: '', date: '', description: '', reminder: false });
      })
      .catch((error) => console.error(error));
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add New Event</h2>

      <div className="form-group">
        <input
          type="text"
          id="title"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder=" "
          required
        />
        <label htmlFor="title">Title</label>
      </div>

      <div className="form-group">
        <input
          type="date"
          id="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          required
          className="not-floating"
        />
        <label htmlFor="date" className="fixed-label">Date</label>
      </div>

      <div className="form-group">
        <textarea
          id="description"
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          placeholder=" "
          required
        />
        <label htmlFor="description">Description</label>
      </div>

      <button type="submit" className="submit-btn">Add Event</button>
    </form>
  );
};

export default EventForm;
