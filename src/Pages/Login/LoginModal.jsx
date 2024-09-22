// src/components/LoginModal.js
import React, { useState } from 'react';
import './LoginModal.css'; // Add styles for the modal
import WhiteBg from "../WhiteBg/WhiteBg";
import Cornericon from '../RCornericon/RCornericon'
const LoginModal = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add login logic here
    console.log('Login details:', username, password);
    closeModal(); // Close the modal after login (optional)
  };

  return (
    <div className="modal-overlay">
    
    <div className="modal"><Cornericon />
       
       <div className="insider">
        
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>Already have an account? <a href="#">Sign Up</a></p>
        </form>
      </div></div>
    </div>
  );
};

export default LoginModal;
