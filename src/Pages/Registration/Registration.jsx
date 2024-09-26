import React, { useEffect, useState } from 'react';
import './Registration.css';
import WhiteBg from '../WhiteBg/WhiteBg';
import Cornericon from '../LCornericon/LCornericon';
import Heading from '../Heading/Heading';
import { useAuth } from '../../libs/helper/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../libs/helper/supabaseClient';
import Registered from './Registered';
import Verfied from './Verfied';
import ieee from '../../assets/Images/ieee.jpg'
import nonIeee from '../../assets/Images/non-ieee.jpg'
import nonMace from '../../assets/Images/non-mace.jpg'
import Loader from '../../components/Loader/Loader';

const ticketOptions = {
  'ieee': {
    qrCode:ieee
  },
  'non-ieee': {
    qrCode: nonIeee
  },
  'non-mace': {
    qrCode: nonMace
  }
}

function Registration() {


  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    mobile:'',
    yearOfStudy: '',
    college: '',
    department: '',
    accomodation:'',
    ticketType: '',
    membershipId: '',
  });

  const [qrCode,setQrCode] = useState(null)
  const [error,setError] = useState(null)
  const [file,setFile] = useState(null)
  const [fileError,setFileError] = useState(null)
  const [loading,setLoading] = useState(true)
  const [isRegistered,setIsRegistered] = useState(false)
  const [isVerified,setIsVerified] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false);
  const {user,loading:authLoading} = useAuth()

  
  // Checking if user has already registered
  const checkRegistration = async() => {
    try {
      const {data,error} = await supabase
      .from('registered-users')
      .select('*')
      .eq('user_id',user.id)
  
      if(error) {
        console.log("Error fetching registration data",error)
        return;
      }

      if (data.length>0) {
        setIsRegistered((data[0].registered))
        setIsVerified((data[0].verified))
      }
       //console.log(data[0])
    } catch (error) {
      console.error("Unexpected error",error.message)
      setError("Unexpected error,try again later")
    }
    finally {
      setLoading(false)
    }
  
  }

  useEffect(()=>{
    if(!user && !authLoading){
      navigate('/signup')
    }
    else if (user)
    {
     // console.log(user)
      checkRegistration()
    }
  },[user,authLoading])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]:value})
    if(name === 'ticketType') {
      const ticket = ticketOptions[value]
      if(ticket) {
        setQrCode(ticket.qrCode)
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true)
    let screenshotURL = null
    setError(null)
    if (!formData.name || !formData.mobile || !formData.yearOfStudy || !formData.college || !formData.ticketType || !formData.department || !formData.accomodation || !file) {
      setError('Please fill all the fields and upload the screenshot')
      setIsSubmitting(false);
      return;
    }

    if(formData.ticketType === 'ieee' && !formData.membershipId) {
      setError('Enter IEEE membership id')
      setIsSubmitting(false);
      return;
    }

    if(file) {
      const fileExtension = file.name.split('.').pop()
      // creating custom file name to access later
      const fileName = `${user.email}_${user.id}.${fileExtension}`

      const {data:uploadData,error:uploadError} = await supabase
      .storage
      .from('payment-screenshots')
      .upload(fileName,file)

      if(uploadError) {
        console.log('Fileupload error',uploadError)
        setError("Error uploading screenshot: "+uploadError.message)
        setIsSubmitting(false);
        return;
      }

      screenshotURL = supabase.storage
      .from('payment-screenshots')
      .getPublicUrl(fileName)
      .data
      .publicUrl

      //console.log("URL",screenshotURL)

    };

    try {
      const {data,error} = await supabase
      .from('registered-users')
      .insert([
        {
          name:formData.name,
          email:user.email,
          mobile:formData.mobile,
          college:formData.college,
          department:formData.department,
          year:formData.yearOfStudy,
          accomodation:formData.accomodation,
          ticket:formData.ticketType,
          membership_id:formData.membershipId,
          screenshot_url:screenshotURL,
          registered:true
        }
      ])
      .select()

      
      if(error) {
        console.error("Supabase error",error)
        setError("Error submitting form,try again later")
        setIsSubmitting(false);
        return;
      }

     // console.log("Registered successfully",data)
      setIsRegistered(true);

    } catch (err) {
      console.error("Submission error:", err);
      setError("Unexpected error, try again later");

    }
    finally {
      setIsSubmitting(false)
    }
  }

//console.log(formData)

  if (loading || isSubmitting) return <Loader/>
  if(isVerified) return <Verfied/>

  if(isRegistered) return <Registered/>


  return (
    <div className="registration">

      <WhiteBg height="auto">
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

          <label htmlFor="mobile">Mobile</label>
          <div className="form-field-container">
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
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

          <label htmlFor="accomodation">Do you require accomodation ?</label>
          <div className="form-field-container">
            <select
              id="accomodation"
              name="accomodation"
              value={formData.accomodation}
              onChange={handleChange}
              required
            >
              <option value="" disabled default>Select Yes or No</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
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

          {
            formData.ticketType === 'ieee' && (
              <>
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
              </>
            )
          }
          
          <div className="form-field-container">
            {
              qrCode ? <img src={qrCode} className='qr-code' alt='qr-code'/>
              : 
              <div className='qr-box'>
                <p>Select ticket to generate qrcode</p>
              </div>
            }
          </div>

          <div className="form-field-container">
            <a href={qrCode} download='SparcRegistrationQRCode.jpg'>
              <button type='button' className='download-btn'>
                Download QR Code
              </button>
            </a>
          </div>

          <label>Add screenshot</label>  
          <div className="form-field-container">
            <input type="file" name="screenshot" accept="image/*" onChange={handleFileChange} />
          </div>
          {
              fileError && <p className='register-error-message'>{fileError}</p>
          }

          <div className="form-field-container">
            <button type="submit" className='submit-btn'>Submit</button>
          </div>
          {
            error && <p className='register-error-message'>{error}</p>
          }
        </form>
      </WhiteBg>
    </div>
  );
}

export default Registration;
