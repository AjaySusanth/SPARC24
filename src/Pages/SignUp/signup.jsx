import React, { useState } from 'react';
import './signup.css';
import CornerIcon from '../LCornericon/LCornericon'
import WhiteBg from '../WhiteBg/WhiteBg';
import GoogleLogo from '../../assets/Images/devicon_google.svg';
import { supabase } from '../../libs/helper/supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(null)

  const navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault()
    setError(null)
    if(!name || ! email || !password) {
      setError("All fields are required")
      return;
    }
    try{
      const {data,error} = await supabase.auth.signUp({
        email:email,
        password:password
      })
      if (error) throw error;
      console.log("Signup")
      navigate('/')

    } catch(error) {
      console.error(error)
      setError(error.message)
    }
  }

  const signUpGoogle = async(e) => {
    e.preventDefault()
    try {
      const {data,error} = await supabase.auth.signInWithOAuth({
        provider:'google',
        options:{
          redirectTo: 'http://localhost:5173/',
        }
      })
      if(error) throw new Error("Sign up with google failed");
    } catch (error) {
        console.error(error.message)
    }
  }

  return (
    <WhiteBg className="sign-up-section"> <CornerIcon />
      <section className="sign-upcont">

        {/* <Heading className="Sign-up" text="Sign-Up"/> */}
        <h2 className="signuptitle">Sign Up</h2>
        <form className="form"  onSubmit={handleSubmit} >
          <div className="formGroup">
            <input 
            type="text" 
            placeholder='Name' 
            id="username" 
            name="name" 
            onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <input type="email" placeholder='Email' id="emailPhone" name="emailPhone"
            onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <input type="password" placeholder="Password" id="password" name="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          {
            error && <p className='error-message'>{error}</p>
          }
          <button type="submit" className="submitButton">Sign Up</button>

        </form>

        <div className="separatorContainer">
          <hr className="separator" />
          <span className="separatorText">OR</span>
          <hr className="separator" />
        </div>

        <div className="socialSignup">
          <button className="socialButton" onClick={signUpGoogle}>
            <img src={GoogleLogo} alt="Google Logo" className="sign-up-logo" />
          </button>
          <button className="socialButton">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub Logo" className="sign-up-logo" />
          </button>
        </div></section>
    </WhiteBg>
    
  );
};

export default SignUp;
