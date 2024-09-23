import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import macelogo from '../../assets/Images/mace logo white.png';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentTab = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentTab = section.getAttribute('id');
        }
      });

      setActiveTab(currentTab);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTabClick = (tabId) => {
    document.getElementById(tabId).scrollIntoView({ behavior: 'smooth' });
    setActiveTab(tabId);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.menu-btn')) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLinkClick = (sectionId) => {
    setSidebarOpen(false);
  };
  const handleLoginClick = () => {
    navigate('/login'); 
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navbarStyle = {
    backgroundColor: scrolled ? '#17246780' : 'transparent',
    transition: 'background-color 0.3s ease',
    position: 'fixed',
    top: 0,
    width: '100%'
  };

  return (
    <nav>
      <ul className={`sidebar ${sidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
        <li className='hide-btn' onClick={() => setSidebarOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        </li>
        <li><a href='#'>Home</a></li>
          <li><a  href='#about'>ABOUT</a></li>
          <li><a href='#tickets'>tickets</a></li>
          <li><a  href='#sessions'>Sessions</a></li>
          <li><a href='#sponsors'>Sponsors</a></li>
          <button className='Sign-Up-btn'>Sign Up</button>
          
      
      </ul>

      
      
      <ul className='navbar' style={navbarStyle}>
        <li><a href="../../" id="logo"><img src={macelogo} alt='logo' /></a></li>
        <div className="seprow">
        <ul>
          <li>
            <a
              href="#home"
              className={activeTab === 'home' ? 'active' : ''}
              onClick={() => handleTabClick('home')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeTab === 'about' ? 'active' : ''}
              onClick={() => handleTabClick('about')}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#tickets"
              className={activeTab === 'tickets' ? 'active' : ''}
              onClick={() => handleTabClick('tickets')}
            >
              tickets
            </a>
          </li>
          <li>
            <a
              href="#sessions"
              className={activeTab === 'sessions' ? 'active' : ''}
              onClick={() => handleTabClick('sessions')}
            >
              Sessions
            </a>
          </li>
          <li>
            <a
              href="#sponsors"
              className={activeTab === 'sponsors' ? 'active' : ''}
              onClick={() => handleTabClick('sponsors')}
            >
              Sponsors
            </a>
          </li>
        </ul>
        </div>
      
        <button className='Sign-Up-btn hideOnMobile'>Sign Up</button>
          <li className='menu-btn hideOnMobile' onClick={() => setSidebarOpen(true)}>
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
