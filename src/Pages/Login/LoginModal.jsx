// src/components/LoginModal.js
import React, { useEffect, useState } from 'react';
import './LoginModal.css'; 
import Cornericon from '../RCornericon/RCornericon'
import WhiteBg from "../WhiteBg/WhiteBg";
import GoogleLogo from '../../assets/Images/devicon_google.svg';
import { supabase } from '../../libs/helper/supabaseClient';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../libs/helper/AuthContext';

const LoginModal = () => {

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [isRegisterIntent, setIsRegisterIntent] = useState(false);
  const [loading,setLoading] = useState(true)

  const { user, loading:authLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (!authLoading) {
      if(user) {
        navigate('/');
      }
      setLoading(false)  
    }
    
  }, [user,authLoading]);

  useEffect(() => {
    if (location.state?.toRegister) {
        setIsRegisterIntent(location.state.toRegister);
    }
    }, [location]);

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


  // Handle Google Sign Up
  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        /*
          options:{
          
            redirectTo: isRegisterIntent ? 'http://localhost:5174/register' 
            :   'http://localhost:5174/'
          }
         */
          options:{
            redirectTo: isRegisterIntent ? 'https://sparc-24.vercel.app/register'
            :   'https://sparc-24.vercel.app/'
          }
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  // Github OAuth
  const handleGithubSignup = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        /*
          options:{
          
            redirectTo: isRegisterIntent ? 'http://localhost:5174/register' 
            :   'http://localhost:5174/'
          }*/
         
          options:{
            redirectTo: isRegisterIntent ? 'https://sparc-24.vercel.app/register'
            :   'https://sparc-24.vercel.app/'
          }
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignupClick = () => {
    if(isRegisterIntent) {
      navigate('/signup',{state:{toRegister:true}})
    }
    else {
        navigate('/signup',{state:{toRegister:false}})
    }
  }

  if (loading) return <Loader/>

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
              <p className='redirect-login' onClick={handleSignupClick}>Don't have an account? {" "} Signup</p>
            </div>
            <div className="social-login">
                <p>------------OR-------------</p>
                <div className="social-icons">
                  <button onClick={handleGoogleSignup} className="social-button">
                    <img src={GoogleLogo} alt="Google Logo" />
                  </button>
                  <button onClick={handleGithubSignup} className="social-button">
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
