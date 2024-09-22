// src/components/LoginModal.js
import React, { useState } from 'react';
import './LoginModal.css'; // Add styles for the modal
import WhiteBg from "../WhiteBg/WhiteBg";
import Cornericon from '../RCornericon/RCornericon'
import { supabase } from '../../libs/helper/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
const LoginModal = ({ closeModal }) => {

  //TODO: Redirect based on Register intent | Google github sign in implementation | Loader

  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(null)
    if(!email || !password ) {
      setError('All fields are required')
      return;
    }
    try {
      const {data,error} = await supabase.auth.signInWithPassword({
        email:email,
        password:password
      })

      if(error) throw error
      navigate('/')
    } catch (error) {
      console.error(error.message)
      setError(error.message)
    }
  };
/*
  const googleSignUp = async(e) => {
    e.preventDefault()
    try {
      const {data,error} = await supabase.auth.signInWithOAuth({
        provider:'google',
        options:{
          redirectTo:'https://sparc-24.vercel.app/'
        }
      })
      if(error) throw error;
    } catch (error) {
      console.log(error)
    }
  }
    */

  return (
    <div className="modal-overlay">
    
    <div className="modal"><Cornericon />
       
       <div className="insider">
        
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {
            error && <p className='error-message'>{error}</p>
          }
          <button type="submit">Login</button>
          <p>Already have an account? <Link to='/signup'>Sign up</Link></p>
        </form>
      </div></div>
    </div>
  );
};

export default LoginModal;
