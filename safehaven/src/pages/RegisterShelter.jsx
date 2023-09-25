import React, {useState} from 'react'
import ShelterForm from "../components/ShelterForm";
import { Header } from "../components/Header";
import CreateShelterMap from '../components/CreateShelterMap'
function RegisterShelter(props) {
  const [shelterLocation, setShelterLocation] = useState();
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
          <CreateShelterMap location={shelterLocation}/>
        </div>
      </div>
    </>
  );
}

export default RegisterShelter