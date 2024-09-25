import './Registered.css'
import { FaWhatsapp } from 'react-icons/fa'
const Registered = () => {
  return (
    <div className='registered-container'>
        <h1 className='registered-title'>You have successfully registered for SPARC'24</h1>
        <p className='registered-sub'>To stay updated with the latest announcements, event details, and more, make sure to join our official WhatsApp channel.</p>
        <div className='registered-btn-container'>
          <button className='join-channel'>
            Join
            <FaWhatsapp className='whatsapp-icon'/>
          </button>
          <button className='back-to-home'>Back to Home</button>
        </div>
    </div>
  )
}
export default Registered