import './Sessions.css';
import Heading from '../Heading/Heading';
import SessionsCard from './SessionsCard';
import WhiteBg from '../WhiteBg/WhiteBg';
import Rcornericon from '../RCornericon/RCornericon'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import sp1 from '../../assets/Images/sp 1.png';
import sp2 from '../../assets/Images/sp 2.png';
import sp3 from '../../assets/Images/sp 3.png';


import 'swiper/css/autoplay';
import { useRef } from 'react';

function Delegate() {

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
        <Heading text="Speakers" className="heading" />
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
                  img={sp1}
                  speakerName="Mr. Arjun Krish"
                  sessionName="Founder and CEO,RabbitSquare"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave} 
                  bubbleText = "How to be a Public Speaker?"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='card-wrapper'>
                <SessionsCard 
                  top={-110} 
                  left={40} 
                  smLeft={60} 
                  img={sp2} 
                  speakerName="Mr. Ananthu Vasudev"
                  sessionName="Founder and Chief Learning Officer,The Evolving Project"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave} 
                  bubbleText = "Building a strong professional presence"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='card-wrapper'>
                <SessionsCard 
                  top={-110} 
                  left={40} 
                  smLeft={60} 
                  img={sp3} 
                  speakerName="Mr. Varghese Benny"
                  sessionName="Founder and CEO,RabbitSquare"
                  handleMouseEnter={handleMouseEnter} 
                  handleMouseLeave={handleMouseLeave} 
                  bubbleText = "Engineering unplugged"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </WhiteBg>
    </section>
  );
}

export default Delegate;
