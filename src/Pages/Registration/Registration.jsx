import React, { useState } from 'react';
import './Registration.css';
import WhiteBg from '../WhiteBg/WhiteBg';
import Cornericon from '../LCornericon/LCornericon';
import Heading from '../Heading/Heading';
import maceLogo from '../../assets/Images/mace logo white.png';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    yearOfStudy: '',
    college: '',
    department: '',
    ticketType: '',
    membershipId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

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
              <option value="">Select Year</option>
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
              <option value="">Select Ticket</option>
              <option value="Student">IEEE Member</option>
              <option value="Faculty">Non IEEE Member</option>
              <option value="General">Non Macian</option>
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
            <button type="submit">Submit</button>
          </div>
        </form>
      </WhiteBg>
    </div>
  );
}

export default Registration;
