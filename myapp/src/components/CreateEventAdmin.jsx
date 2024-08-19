import { useState } from 'react';
import axios from 'axios';
// import AuthContext from '../contextAPI/authContext';
import '../styles/CreateEvent.css'
// import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

// const socket = io('http://localhost:8080');

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [participantLimit, setParticipantLimit] = useState('');
  const [error , setError] = useState("");
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    const response = await axios.post('http://localhost:8080/event/create', {
      name,
      date,
      time,
      location,
      description,
      participantLimit,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
      console.log(response.data);
      if(!response){
        setError("response not valid")
      }

      // Emit event creation notification to all connected clients
      // socket.emit('newEventNotification', {
      //   name,
      //   date,
      //   time,
      //   location,
      //   description,
      //   participantLimit,
      // });

      alert("Event Created SuccessFully")
      setName("");
      setDate("")
      setTime("")
      setLocation("")
      setDescription("")
      setParticipantLimit("");
      Navigate('/admin');
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
      // handle error during creation of event
    }
  };

  return (
    <div className="create-event-container">
      {/* <h2 className="text-center mb-1">Create a New Event</h2> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter event name"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter event location"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="participantLimit">Participant Limit</label>
          <input
            type="number"
            id="participantLimit"
            value={participantLimit}
            onChange={(e) => setParticipantLimit(e.target.value)}
            placeholder="Enter participant limit"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Create Event
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateEvent;
