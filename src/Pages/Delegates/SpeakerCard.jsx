import React from 'react';
import './SpeakerCard.css';
import Card from "../../components/Card";
import styled from 'styled-components';

{/*const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #F8F8F8; 
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 90%; 
  margin: 0 auto; 

  img {
    width: 50px; 
    height: auto;
    margin-right: 1rem; 
  }

  &::before {
    content: "";
    position: absolute;
    top: ${(props) => props.top}px; 
    left: ${(props) => props.left}px;
    width: 50px; 
    height: 70px;
    background-image: url(${(props) => props.img});
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
  }
`;*/}

const TextBubble = styled.div`
  font-size: 0.9rem;
  font-family: 'Nunito Sans', sans-serif;
  color: #fff;
  flex-grow: 1; 
  word-wrap: break-word; 
  text-align: center;
  font-style: italic;
  margin-top: 30px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-top: 20px;

  }
`;

const SpeakerCard = ({ top, left, smLeft, img, sessionName, speakerName, bubbleText, handleMouseEnter, handleMouseLeave }) => {
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Card>
        <div className="delegate-card-content">
         
          <img className="dp" src={img}/>
           <h2 className='delegate-card-title'> {speakerName}</h2>
           <h3 className="delegate-card-subtitle">{sessionName}</h3>
        </div>
        {/*<div className="card-footer">
          <ButtonContainer top={top} left={left} smLeft={smLeft} img={img}>
          </ButtonContainer>
        </div>*/}
        
          <TextBubble >
            {bubbleText}
          </TextBubble>
      </Card>
    </div>
  );
};

export default SpeakerCard;
