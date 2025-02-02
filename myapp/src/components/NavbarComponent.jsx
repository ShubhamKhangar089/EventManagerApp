import { useContext } from "react";
import { Link } from "react-router-dom";
import '../styles/NavbarStyle.css';
import AuthContext from "../contextAPI/authContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <nav className="nav-container">
      <Link to="/" className="nav-brand">
        SEMA
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/events" className="nav-link">
            Events
          </Link>
        </li>
        {user ? (
          <>
            {user.role === 'Admin' && (
              <li>
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
            )}
            <li>
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </li>
            {/* <li>
              <NotificationIcon notifications={notifications} />
            </li> */}
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// const NotificationIcon = ({ notifications }) => {
//   return (
//     <div style={{margin:'15px'}}>
//       <span className="material-symbols-outlined">
//        notifications_active
//        <sup>{notifications.length}</sup>
//      </span>
      
//       <ul>
//         {notifications.map((notif, index) => (
//           <li key={index}>{notif.message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

export default Navbar;
