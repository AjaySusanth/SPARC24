// src/components/LoginModal.js
import React, { useState } from 'react';
import './LoginModal.css'; 
import Cornericon from '../RCornericon/RCornericon'
import WhiteBg from "../WhiteBg/WhiteBg";
import GoogleLogo from '../../assets/Images/devicon_google.svg';
import { supabase } from '../../libs/helper/supabaseClient';
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
  // State for Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  // State for Sign Up
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState(null);

  const navigate = useNavigate();

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    if (!loginEmail || !loginPassword) {
      setLoginError('All fields are required');
      return;
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error(error.message);
      setLoginError(error.message);
    }
  };

  // Handle Sign Up
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError(null);
    if (!signupName || !signupEmail || !signupPassword) {
      setSignupError('All fields are required');
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
      });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error(error.message);
      setSignupError(error.message);
    }
  };

  // Handle Google Sign Up
  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://sparc-24.vercel.app/',
        },
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Cornericon />
      
          <div className="auth-container">
            {/* Login Form */}
            <div className="auth-form">
              <h2>Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <input
                className='button1'
                  type="text"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                className='button1'
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                {loginError && <p className="error-message">{loginError}</p>}
                <button type="submit" className="submit">Login</button>
              </form>
            </div>
            <div className="social-login">
                <p>------------OR-------------</p>
                <div className="social-icons">
                  <button onClick={handleGoogleSignup} className="social-button">
                    <img src={GoogleLogo} alt="Google Logo" />
                  </button>
                  <button onClick={() => {/* Add GitHub login handler */}} className="social-button">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub Logo" />
                  </button>
                </div>
              </div>

           
          </div>
      
        
      </div>
    </div>
  );
};

export default LoginModal;
