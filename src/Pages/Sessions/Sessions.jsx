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
                  //img={img2} 
                  sessionName="How to be a Public Speaker" 
                  speakerName="Mr. Arjun Krish"
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
                  sessionName="Building a strong professional presence" 
                  speakerName="Mr. Ananthu Vasudev"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave} 
                  bubbleText  = "Learn how to craft a professional image that sets you apart,from effective networking to establishing your personal brand,and become a standout in any industry."
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
                  sessionName="Engineering Unplugged" 
                  speakerName="Mr. Varghese Benny"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave} 
                  bubbleText = "Discover the essential skills every engineer needs, from innovative thinking to powerful communication, and learn how to stand out in a competitive world."
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
