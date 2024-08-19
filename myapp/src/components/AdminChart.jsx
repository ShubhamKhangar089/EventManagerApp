import { useState } from 'react';
import { FaUsers, FaClock, FaMapMarkerAlt, FaListUl } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CreateEvent from './CreateEventAdmin';
import '../styles/AdminChart.css'

export const EventStatistics = () => {
  const { events } = useSelector((state) => state.events);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

const handleCreateEventClick = () => {
  setShowCreateEventModal(true);
};

const handleCloseModal = () => {
  setShowCreateEventModal(false);
};
  console.log('EventStatistics :', events);

  return (
    <div
      style={{
        maxWidth: '90vw',
        margin: '10px auto',
        padding: '16px',
        background: 'linear-gradient(to right, #0097A7, #2196F3)',
        borderRadius: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
     
      {/* // create event */}
       <div style={{display: "flex"  , justifyContent: 'space-evenly'}}>
       <h1 style={{ fontSize: '24px', marginBottom: '16px', color: 'black' }}>
        Event Statistics
      </h1>
    <button onClick={handleCreateEventClick} className="create-event-btn">Create Event +</button>
    {showCreateEventModal && (
      <div className="modal">
        <div className="modal-overlay"></div>
        <div className="modal-content">
        <button onClick={handleCloseModal} className="close-modal-btn"> </button>
          <CreateEvent />
        </div>
      </div>
    )}
    </div>
    {/* // */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {events && events.map((event) => (
          <div
            key={event._id}
            style={{
              padding: '16px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              ':hover': {
                background: '#F7F7F7',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <h2 style={{ fontSize: '18px', color: '#333' }}>
                {event.name}
              </h2>
              <span
                style={{
                  fontSize: '14px',
                  color: 'white',
                  background: '#34C759',
                  padding: '4px 8px',
                  borderRadius: '16px',
                }}
              >
                {event.participantLimit} participants
              </span>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaUsers style={{ fontSize: '24px', color: '#666', marginRight: '8px' }} />
                <span style={{ fontSize: '16px', color: '#666' }}>
                  Participants
                </span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {event.participants.length}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {event.participants.length} / {event.participantLimit}
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaClock style={{ fontSize: '24px', color: '#666', marginRight: '8px' }} />
                <span style={{ fontSize: '16px', color: '#666' }}>
                  Date and Time
                </span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaMapMarkerAlt style={{ fontSize: '24px', color: '#666', marginRight: '8px' }} />
                <span style={{ fontSize: '16px', color: '#666' }}>
                  Location
                </span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {event.location}
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaListUl style={{ fontSize: '24px', color: '#666', marginRight: '8px' }} />
                <span style={{ fontSize: '16px', color: '#666' }}>
                  Waitlist
                </span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {event.waitlist.length}
              </div>
            </div>
            <a
              href={`/events/${event._id}`}
              style={{
                color: '#0097A7',
                textDecoration: 'none',
                ':hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              View Event Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventStatistics;