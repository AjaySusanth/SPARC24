import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Timeline.css';
import WhiteBg from '../WhiteBg/WhiteBg';
import Heading from '../Heading/Heading';
import CornerIcon from '../LCornericon/LCornericon';
import OppositeContentTimeline from './Day1';
import OppositeContentTimeline2 from './Day2';

function Timeline() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (Math.abs(touch.pageX - touch.clientX) > Math.abs(touch.pageY - touch.clientY)) {
        // Horizontal scroll
        e.preventDefault(); // Prevent default horizontal scrolling
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section id='timeline' className='section'>
      <WhiteBg height="auto">
        <CornerIcon />
        <Heading text="Timeline" />
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          showIndicators={false}
          autoPlay={false}
          emulateTouch={true}
          swipeable={true} // Enable swiping but control touch movement
          onSwipeStart={() => setIsScrolling(true)} 
          onSwipeEnd={() => setIsScrolling(false)} 
          preventMovementUntilSwipeScrollTolerance={true} // Prevent swipe until threshold
          swipeScrollTolerance={50} // Adjust swipe threshold to prioritize vertical scrolling
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button type="button" onClick={onClickHandler} className="custom-arrow custom-arrow-prev">
                &#8249;
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button type="button" onClick={onClickHandler} className="custom-arrow custom-arrow-next">
                &#8250;
              </button>
            )
          }
        >
          <div>
            {/**<h2 className='timeline-date'>October 19</h2>**/}
            <OppositeContentTimeline />
          </div>
        </Carousel>
      </WhiteBg>
    </section>
  );
}

export default Timeline;
