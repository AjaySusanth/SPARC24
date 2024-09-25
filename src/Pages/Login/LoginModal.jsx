import React, { useEffect, useState } from 'react';
import WhiteBg from "../WhiteBg/WhiteBg";
import GoogleLogo from '../../assets/Images/devicon_google.svg';
import { supabase } from '../../libs/helper/supabaseClient';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../libs/helper/AuthContext';
import Loader from '../../components/Loader/Loader';
import CornerIcon from '../LCornericon/LCornericon';
import '../SignUp/signup.css'

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
      
      if (isRegisterIntent) {
        navigate('/register');
      } else {
        navigate('/');
      }

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
    <section className='main-sec' >
      <WhiteBg className="sign-up-section"> <CornerIcon />
        <div className="sign-upcont">

          {/* <Heading className="signuptitle" text="Sign-Up"/> */}
          <h2 className="signuptitle">Login</h2>
          <form className="form" onSubmit={handleLoginSubmit}>
            <div className="formGroup">
              <input type="email" placeholder='Email' id="emailPhone" name="email" required
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <input type="password" placeholder="Password" id="password" name="password" required
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            {
              loginError && <p className='error-message'>{loginError}</p>
            }
            <button type="submit" className="submitButton">Login</button>
          </form>
          <p className='redirect-login' onClick={handleSignupClick}>Don't have an account? {" "}<span>Signup</span></p>
          <div className="separatorContainer">
            <hr className="separator" />
            <span className="separatorText">OR</span>
            <hr className="separator" />
          </div>

          <div className="socialSignup">
            <button className="socialButton" onClick={handleGoogleSignup}>
              <img src={GoogleLogo} alt="Google Logo" className="sign-up-logo" />
            </button>
            <button className="socialButton" onClick={handleGithubSignup}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub Logo" className="sign-up-logo" />
            </button>
          </div>
        </div>
      </WhiteBg>
    </section>
  );
};

export default LoginModal;
