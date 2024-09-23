import React, { useEffect, useState } from 'react';
import './Registration.css';
import WhiteBg from '../WhiteBg/WhiteBg';
import Cornericon from '../LCornericon/LCornericon';
import Heading from '../Heading/Heading';
import maceLogo from '../../assets/Images/mace logo white.png';
import qr from '../../assets/Images/qrcode.jpg'
import { useAuth } from '../../libs/helper/AuthContext';
import { useNavigate } from 'react-router-dom';

const ticketOptions = {
  'ieee': {
    qrCode:qr,
    UPI_LINK: 'upi://pay?pa=8943460250@ptsbi&pn=AjaySusanth&am=50&cu=INR&tn=Sparc%20Registration'
  },
  'non-ieee': {
    qrCode: qr,
    UPI_LINK: 'upi://pay?pa=8943460250@ptsbi&pn=AjaySusanth&am=100&cu=INR&tn=Sparc%20Registration'
  },
  'non-mace': {
    qrCode: qr,
    UPI_LINK: 'upi://pay?pa=8943460250@ptsbi&pn=AjaySusanth&am=150&cu=INR&tn=Sparc%20Registration'
  }
}


function Registration() {

  //CURRENTLY DOING: handleFileChange, test it

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    yearOfStudy: '',
    college: '',
    department: '',
    ticketType: '',
    membershipId: '',
  });

  const [qrCode,setQrCode] = useState(null)
  const [upiLink,setUpiLink] = useState(null)
  const [error,setError] = useState(null)
  const [file,setFile] = useState(null)
  const [fileError,setFileError] = useState(null)
  const [loading,setLoading] = useState(true)

  const {user,loading:authLoading} = useAuth()

  useEffect(()=>{
    if(!user && !authLoading){
      navigate('/signup')
    }
    else if (user)
    {
      console.log(user)
      setLoading(false)
      //checkRegistration()
    }
  },[user,authLoading])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]:value})
    if(name === 'ticketType') {
      const ticket = ticketOptions[value]
      console.log(ticket)
      if(ticket) {
        setQrCode(ticket.qrCode)
        setUpiLink(ticket.UPI_LINK)
      }
    }
  };

  const maxFileSize = 400 * 1024 // 400kb
  const handleFileChange = (e)=> {
    setError(null)
    setFileError(null)
    const file = e.target.files[0]
    if(!file.type.startsWith("image/")) {
      setFileError("Invalid file type, please upload an image")
      setFile(null)
      return;
    }

    // Handling file size limits
    if(file.size > maxFileSize) {
      setFileError("The uploaded file is too large. Please ensure it is under 400 KB")
      setFile(null)
      return;
    } 
    setFile(file)  
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null)
    if (!formData.name || !formData.yearOfStudy || !formData.college || !formData.ticketType || !formData.department || !file)
      {
        setError('Please fill all the fields and upload the screenshot')
        return;
      }
    console.log('Form submitted:', formData);
    console.log(file)
  };

//console.log(formData)

  if (loading) return <p className='loader'>Loading.....</p>

  return (
    <div className="registration">
      <header>
        <img src={maceLogo} alt="MACE Logo" />
      </header>
      <WhiteBg height="auto" className="white-bg">
        <Cornericon />
        <Heading text="Register" />
        <form className="registration-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <div className="form-field-container">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="college">College</label>
          <div className="form-field-container">
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="department">Department</label>
          <div className="form-field-container">
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="yearOfStudy">Year of Study</label>
          <div className="form-field-container">
            <select
              id="yearOfStudy"
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              required
            >
              <option value="" disabled default>Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <label htmlFor="ticketType">Ticket</label>
          <div className="form-field-container">
            <select
              id="ticketType"
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              required
            >
              <option value="" disabled default>Select Ticket</option>
              <option value="ieee">IEEE Member (Mace)</option>
              <option value="non-ieee">Non IEEE Member (Mace)</option>
              <option value="non-mace">Non Macian</option>
            </select>
          </div>

          <label htmlFor="membershipId">Membership ID</label>
          <div className="form-field-container">
            <input
              type="text"
              id="membershipId"
              name="membershipId"
              value={formData.membershipId}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-field-container">
            {
              qrCode ? <img src={qr} className='qr-code' alt='qr-code'/>
              : 
              <div className='qr-box'>
                <p>Select ticket to generate qrcode</p>
              </div>
            }
          </div>

          <div className="form-field-container">
            <button
              type="button"
              onClick={() => window.open(upiLink, '_blank')}
              className="payment-btn"
              aria-label="UPI Payment"
            >
              Pay via UPI App
            </button>
          </div>

          <label>Add screenshot</label>  
          <div className="form-field-container">
            <input type="file" name="screenshot" accept="image/*" onChange={handleFileChange} />
          </div>
          {
              fileError && <p className='error-message'>{fileError}</p>
          }

          <div className="form-field-container">
            <button type="submit">Submit</button>
          </div>
          {
            error && <p className='error-message'>{error}</p>
          }
        </form>
      </WhiteBg>
    </div>
  );
}

export default Registration;
