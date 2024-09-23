import React from "react";
import "./Memories.css";
import memories from "../../assets/Images/memo.png";
import memoriessmall1 from "../../assets/Images/memories small1.png";
import memoriessmall2 from "../../assets/Images/sparc2 1.png";
import memoriessmall3 from "../../assets/Images/sparc3 1.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import WhiteBg from "../WhiteBg/WhiteBg";
import Cornericon from '../RCornericon/RCornericon'
import Heading from "../Heading/Heading";
function Memories() {
  return (
    <>
      
      
      <WhiteBg height="auto"><div className="memories">
        <Cornericon />
       
       <Heading text=" MEMORIES" />

        <img src={memories} alt="memories" className="memoryimg" />
        <img src={memoriessmall1} alt="memoriessmall" className="memoryimgsmall" />
        <img src={memoriessmall2} alt="memoriessmall" className="memoryimgsmall" />
        <img src={memoriessmall3} alt="memoriessmall" className="memoryimgsmall" />

       
        </div></WhiteBg>
      
    </>
  );
}

export default Memories;
