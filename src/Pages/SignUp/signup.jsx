import React from 'react';
import './signup.css';
import CornerIcon from '../LCornericon/LCornericon'
import WhiteBg from '../WhiteBg/WhiteBg';
import GoogleLogo from '../../assets/Images/devicon_google.svg';

const SignUp = () => {
  return (
    
        <WhiteBg className="sign-up-section"> <CornerIcon/>
            <section className="sign-upcont">
       
      {/* <Heading className="Sign-up" text="Sign-Up"/> */}
      <h2 className="signuptitle">Sign-Up</h2>
      <form className="form">
        <div className="formGroup">
          <input type="text" placeholder='Username' id="username" name="username" required />
        </div>

        <div className="formGroup">
          <input type="text" placeholder='Email/Phone' id="emailPhone" name="emailPhone" required />
        </div>

        <div className="formGroup">
          <input type="password" placeholder="Password"  id="password" name="password" required />
        </div>

        <div className="formGroup">
          <input type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" required />
        </div>

        <button type="submit" className="submitButton">Sign Up</button>
      </form>

      <div className="separatorContainer">
        <hr className="separator" />
        <span className="separatorText">OR</span>
        <hr className="separator" />
      </div>

      <div className="socialSignup">
        <button className="socialButton">
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
