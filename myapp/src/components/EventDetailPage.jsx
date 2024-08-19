import { useEffect, useState } from "react";
import axios from "axios";
// import { Box, Heading, Text, Button, Divider, Flex, Icon, Spacer } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_EVENT_FAILURE,
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  REGISTER_SUCCESS,
  CANCEL_REGISTRATION_SUCCESS,
} from "../redux/actionTypes/eventActionTypes";
import '../styles/EventDetails.css'

const API_URL = "http://localhost:8080";

const EventDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [registeredEvents, setRegisteredEvents] = useState(() => {
    const storedRegisteredEvents = localStorage.getItem("registeredEvents");
    return storedRegisteredEvents ? JSON.parse(storedRegisteredEvents) : {};
  });

  useEffect(() => {
    localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  useEffect(() => {
    const fetchEvents = async () => {
      dispatch({ type: GET_EVENT_REQUEST });
      try {
        const response = await axios.get(`${API_URL}/event/get`);
        dispatch({ type: GET_EVENT_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({ type: GET_EVENT_FAILURE });
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleRegistration = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token:", token);

      const response = await axios.post(
        `${API_URL}/event/register/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Register for an event :", response.data.event);
      setRegisteredEvents((prev) => ({ ...prev, [eventId]: true }));
      dispatch({ type: REGISTER_SUCCESS });
    } catch (error) {
      console.error("Error registering for event:", error.message);
      // Display an error message to the user
      alert(`Error registering for event: ${error.message}`);
    }
  };

  const handleCancelRegistration = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token:", token);

      const response = await axios.post(
        `${API_URL}/event/cancel/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Cancel registration for an event :", response.data.event);
      setRegisteredEvents((prev) => ({ ...prev, [eventId]: false }));
      dispatch({ type: CANCEL_REGISTRATION_SUCCESS });
    } catch (error) {
      console.error("Error canceling registration for event:", error.message);
      // Display an error message to the user
      alert(`Error canceling registration for event: ${error.message}`);
    }
  };

  const renderEventHeader = (event) => <h2 className="event-header">{event.name}</h2>;

const renderEventDetails = (event) => {
  const isRegistered = registeredEvents[event._id];
  return (
    <div className="event-card">
      <div className="event-header-container">
        {renderEventHeader(event)}
      </div>
      <p className="event-description">{event.description}</p>
      <div className="event-details">
        <div className="event-location">
          <i className="location-icon" />
          <span>Location: {event.location}</span>
        </div>
        <div className="event-date">
          <i className="calendar-icon" />
          <span>Date: {new Date(event.date).toDateString()}</span>
        </div>
        <div className="event-time">
          <i className="clock-icon" />
          <span>Time: {event.time}</span>
        </div>
      </div>
      <div className="event-actions">
          {isRegistered ? (
            <button
              className="cancel-registration-button"
              onClick={() => handleCancelRegistration(event._id)}
            >
              Cancel Registration
            </button>
          ) : (
            <button
              className="register-button"
              onClick={() => handleRegistration(event._id)}
            >
              Register
            </button>
          )}
        </div>
    </div>
  );
};

if (error) {
  return <p>error..</p>;
}

if (loading) {
  return <p>loading...</p>;
}

if (!Array.isArray(events)) {
  return <p>No events found</p>;
}

return (
  <div className="event-container">
    {events.map((event) => (
      <div key={event._id} className="event-card-container">
        {renderEventDetails(event)}
      </div>
    ))}
  </div>
);
};

export default EventDetailPage;