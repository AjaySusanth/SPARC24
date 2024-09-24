import React, { useEffect, useState } from 'react';
import './signup.css';
import CornerIcon from '../LCornericon/LCornericon'
import WhiteBg from '../WhiteBg/WhiteBg';
import GoogleLogo from '../../assets/Images/devicon_google.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../libs/helper/supabaseClient';
import { useAuth } from '../../libs/helper/AuthContext';

const SignUp = () => {


  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(null)
  const [isRegisterIntent, setIsRegisterIntent] = useState(false);  
  const [loading,setLoading] = useState(true)  
  const location = useLocation()
  const navigate = useNavigate()

  const { user, loading:authLoading } = useAuth();

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

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError(null)
    if(!name || !email || !password) {
      setError('All fields are required')
      return;
    }
    try {
      const {data,error} = await supabase.auth.signUp({
        email:email,
        password:password
      })

      if(error) throw error;

      if (isRegisterIntent) {
        navigate('/register');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.log(error)
      setError(error.message) 
    }
  }

  const googleSignUp = async(e) => {
    e.preventDefault()
    try {
      const {data,error} = await supabase.auth.signInWithOAuth({
        provider:'google',
        /*
        options:{
          redirectTo: isRegisterIntent ? 'http://localhost:5174/register' 
          :   'http://localhost:5174/'
        }*/
       
        options:{
          redirectTo: isRegisterIntent ? 'https://sparc-24.vercel.app/register'
          :   'https://sparc-24.vercel.app/'
        }
      })
      if(error) throw error;
    } catch (error) {
      console.log(error)
    }
  }

  const githubSignUp = async(e) => {
    e.preventDefault()
    try {
      const {data,error} = await supabase.auth.signInWithOAuth({
        provider:'github',
        /*
        options:{
          redirectTo: isRegisterIntent ? 'http://localhost:5174/register' 
          :   'http://localhost:5174/'
        }*/
        options:{
          redirectTo: isRegisterIntent ? 'https://sparc-24.vercel.app/register'
          :   'https://sparc-24.vercel.app/'
        }
      })
      if(error) throw error;
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginClick = () => {
    if(isRegisterIntent) {
      navigate('/login',{state:{toRegister:true}})
    }
    else {
        navigate('/login',{state:{toRegister:false}})
    }
  }

  if (loading) return <p className='loader'>Loading.....</p>

  return (
  <section className='main-sec' >
    <WhiteBg className="sign-up-section"> <CornerIcon />
    <div className="sign-upcont">

        {/* <Heading className="Sign-up" text="Sign-Up"/> */}
        <h2 className="signuptitle">Sign-Up</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            <input type="text" placeholder='Name' id="username" name="name"
             onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <input type="email" placeholder='Email' id="emailPhone" name="email" required
            onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <input type="password" placeholder="Password" id="password" name="password" required
            onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          {
            error && <p className='error-message'>{error}</p>
          }
          <button type="submit" className="submitButton">Sign Up</button>
        </form>
        <p className='redirect-login' onClick={handleLoginClick}>Already have an account? {" "}Login</p>
        <div className="separatorContainer">
          <hr className="separator" />
          <span className="separatorText">OR</span>
          <hr className="separator" />
        </div>

        <div className="socialSignup">
          <button className="socialButton" onClick={googleSignUp}>
            <img src={GoogleLogo} alt="Google Logo" className="sign-up-logo" />
          </button>
          <button className="socialButton" onClick={githubSignUp}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub Logo" className="sign-up-logo" />
          </button>
        </div>
        </div>
    </WhiteBg>
    </section>
  );
};

export default SignUp;
