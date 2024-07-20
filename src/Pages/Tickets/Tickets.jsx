import React from 'react'
import './Tickets.css'
import icon from "../../assets/Images/corner icon.png";
import t1 from "../../assets/Images/blue ticket.png";
import t2 from "../../assets/Images/white ticket.png";

function Tickets() {
  return (
    <section id='ticket' className='sectionstyle'>
      <div className="content">
        <img src={icon} className='rightcornericon'/>
        <h1>GRAB YOUR TICKETS</h1>
        <div className="cards">
          <div className="ticket t1">
            <img src={t1} className='tkt-icon' alt='tkt-icon'></img>
            <h2>IEEE MEMBERS</h2>
            <button className='reg-btn'>Register Now ↗</button>
          </div>
          <div className="ticket t2">
            <img src={t2} alt='tkt-icon' className='tkt-icon'></img>
            <h2>NON IEEE MEMBERS</h2>
            <button className='reg-btn'>Register Now ↗</button>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default Tickets