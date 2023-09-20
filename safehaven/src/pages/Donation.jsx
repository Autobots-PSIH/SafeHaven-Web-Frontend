import React from 'react';
import disaster from '../images/disaster.jpg';
import { Header } from '../components/Header';
import volcano from '../images/volcano.jpg';
import earthquake from '../images/earthquake.jpg';
import flood from '../images/flood.jpg'

function Donation({isLoggedIn}) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'column',
  };

  const imageStyle = {
    height: '50vh',
    width: '100vw',
    opacity: 0.7,
    position: 'relative',
  };

  const textOverlayStyle = {
    position: 'absolute',
    top: '27%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '40px',
    fontWeight: 'bold',
  };
  const textOverlaySub = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
  };
  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '60%',
    position: 'absolute',
    top: '75%',
    height:'50vh',
  };

  const cardStyle = {
    width: '32%',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'scale(1)',
    transformOrigin: 'center',
  };

  const cardImageStyle = {
    height: '60%', 
    width: '100%', 
    borderRadius: '10px', 
  };

  const buttonText = 'Donate';
  const buttonStyle = {
    backgroundColor: 'black', 
    color: 'white', 
    padding: '10px 20px', 
    borderRadius: '5px', 
    border: 'none', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    position: 'absolute', 
    bottom: '20px', 
    left: '50%', 
    transform: 'translateX(-50%)', 
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div style={containerStyle}>
        <img src={disaster} alt="Disaster" style={imageStyle} />
        <div style={textOverlayStyle}>YOUR HELP MATTERS</div>
        <div style={textOverlaySub}>
          Donate Today and Make a Difference in Someone's Life!
        </div>

        <div style={cardContainerStyle}>
          <div
            style={cardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img src={flood} alt="Card Image" style={cardImageStyle} />
            <p style={{ padding: "10px" }}>
              Donate for Assam Floods Relief Fund
            </p>
            <button style={buttonStyle}>{buttonText}</button>
          </div>

          <div
            style={cardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img src={volcano} alt="Card Image" style={cardImageStyle} />
            <p style={{ padding: "10px" }}>
              Donate for Volcano eruption victims in Hawaii and Guatemala
            </p>
            <button style={buttonStyle}>{buttonText}</button>
          </div>

          <div
            style={cardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img src={earthquake} alt="Card Image" style={cardImageStyle} />
            <p style={{ padding: "10px" }}>Help the earthquake victims</p>
            <button style={buttonStyle}>{buttonText}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Donation;
