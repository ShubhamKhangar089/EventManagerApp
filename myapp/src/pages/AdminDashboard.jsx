import { useState } from "react";
// import CreateEvent from "../components/CreateEventAdmin";
import '../styles/AdminDashBoard.css'
import { EventStatistics } from "../components/AdminChart";

export const AdminDashboard =()=>{
// const [showCreateEventModal, setShowCreateEventModal] = useState(false);

// const handleCreateEventClick = () => {
//   setShowCreateEventModal(true);
// };

// const handleCloseModal = () => {
//   setShowCreateEventModal(false);
// };

return (
    <div className="admin-dashboard">
    {/* create Event Button */}
    {/* <div>
    <button onClick={handleCreateEventClick} className="create-event-btn">Create Event</button>
    {showCreateEventModal && (
      <div className="modal">
        <div className="modal-overlay"></div>
        <div className="modal-content">
        <button onClick={handleCloseModal} className="close-modal-btn"> </button>
          <CreateEvent />
        </div>
      </div>
    )}
    </div> */}
    <div>
    <EventStatistics />
    </div>
  </div>
);
};