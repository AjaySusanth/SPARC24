import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import "./Highlights.css";
import WhiteBg from "../WhiteBg/WhiteBg";
import Cornericon from "../LCornericon/LCornericon";
import Heading from "../Heading/Heading";
import image from "../../assets/Images/young woman with headphones.png";

function AnimatedNumber({ value, inView }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: inView ? value : 0,
    config: { duration: 900 }, 
  });
  return <animated.span>{number.to(n => n.toFixed(0))}</animated.span>;
}

function Highlights() {
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.5, 
  });

  return (
    <div className="highlights" ref={ref}>
      <WhiteBg height="auto">
        <Cornericon />
        <Heading text="Highlights" />
        <p className="highlights-text">
          Here’s what SPARC has for you on the platform this time around to explore the professional in you.
        </p>
        <div className="highlights-content">
          <div className="highlight-item">
            <span className="item-no"><AnimatedNumber value={2} inView={inView} /></span>
            <span className="item-name">SESSIONS</span>
          </div>
          <div className="highlight-item">
            <span className="item-no"><AnimatedNumber value={1} inView={inView} /></span>
            <span className="item-name">WORKSHOP</span>
          </div>
          <div className="highlight-item">
            <span className="item-no"><AnimatedNumber value={1} inView={inView} /></span>
            <span className="item-name">COMPETITION</span>
          </div>
          <div className="highlight-item">
            <span className="item-no"><AnimatedNumber value={1} inView={inView} /></span>
            <span className="item-name">SPARC NIGHT</span>
          </div>
        </div>
        <div className="highlight-image">
          <img src={image} alt="Person illustration" />
        </div>
      </WhiteBg>
    </div>
  );
}

export default Highlights;
