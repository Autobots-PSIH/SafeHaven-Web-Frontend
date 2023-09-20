import React, {useState} from 'react'
import ShelterForm from "../components/ShelterForm";
import { Header } from "../components/Header";
function RegisterShelter(props) {
  const [shelterLocation, setShelterLocation] = useState({
    lat: 19.21833,
    lng: 72.978088,
  });
  const isLoggedIn = props.isLoggedIn;
  const accessToken= props.accessToken;
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div className="flexible-column-container">
        <div className="column-left">
          <ShelterForm setShelterLocation={setShelterLocation}  accessToken={accessToken}/>
        </div>
        <div className="column-right">
        </div>
      </div>
    </>
  );
}

export default RegisterShelter