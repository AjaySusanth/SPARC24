import './Sessions.css';
import Heading from '../Heading/Heading';
import SessionsCard from './SessionsCard';
import WhiteBg from '../WhiteBg/WhiteBg';
import Rcornericon from '../RCornericon/RCornericon'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import img1 from '../../assets/Images/Young man making a presentation.png';
import img2 from '../../assets/Images/Young woman working on a computer.png';

import 'swiper/css/autoplay';
import { useRef } from 'react';

function Sessions() {

  const swiperRef = useRef(null);

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <section className='section' id="sessions">
      <WhiteBg>
        <Rcornericon />
        <Heading text="Sessions" className="heading" />
        <div>
          <Swiper
            modules={[Autoplay]}
            speed={2000}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            loop
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              868: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              1700: {
                slidesPerView: 3,
              }
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            
            <SwiperSlide>
              <div className='card-wrapper'>
                <SessionsCard 
                  top={-110} 
                  left={40} 
                  smLeft={60} 
                  //img={img1} 
                  sessionName="A Peek into the Industry" 
                  speakerName="Revealed to be soon"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave} 
                  bubbleText = "Gain industry insights, develop key professional skills, and explore career opportunities with expert guidance."
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='card-wrapper'>
                <SessionsCard 
                  top={-110} 
                  left={40} 
                  smLeft={60} 
                  //img={img2} 
                  sessionName="How to be a Public Speaker" 
                  speakerName="Revealed to be soon"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave} 
                  bubbleText = "Learn to overcome presentation hurdles, build confidence, and turn nervousness into impactful communication for lasting professional growth."
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='card-wrapper'>
                <SessionsCard 
                  top={-110} 
                  left={40} 
                  smLeft={60} 
                  //img={img1} 
                  sessionName="Team Building Session " 
                  speakerName="Revealed to be soon"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave} 
                  bubbleText = "Foster collaboration, innovation, and interpersonal skills to boost efficiency and teamwork in a vibrant setting."
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='card-wrapper'>
                <SessionsCard 
                  top={-110} 
                  left={40} 
                  smLeft={60} 
                  //img={img2} 
                  sessionName="What would you do?" 
                  speakerName="Revealed to be soon"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave}
                  bubbleText = "Gain the ability to tackle social dilemmas and make confident, thoughtful decisions."
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='card-wrapper'>
                <SessionsCard 
                  top={-110} 
                  left={40} 
                  smLeft={60} 
                  //img={img1} 
                  sessionName="Resume writing and Interview skills" 
                  speakerName="Revealed to be soon"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave} 
                  bubbleText = "Transform your resume and interview skills, boost your confidence, and enhance your career prospects with our expert-led workshop."
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='card-wrapper'>
                <SessionsCard 
                  top={-110} 
                  left={40} 
                  smLeft={60} 
                  //img={img2} 
                  sessionName="How to be an Entrepreneur?" 
                  speakerName="Revealed to be soon"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave} 
                  bubbleText = "Learn key techniques and strategies to turn your ideas into successful ventures in our entrepreneurship workshop."
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </WhiteBg>
    </section>
  );
}

export default Sessions;
