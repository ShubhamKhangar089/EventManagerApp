import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { AuthProvider } from './contextAPI/authContext';  // Import AuthProvider
import { BrowserRouter as Router } from 'react-router-dom';  // Import BrowserRouter

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>  {/* Ensure Router wraps everything */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </Provider>
);
