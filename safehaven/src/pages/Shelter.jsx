import React from 'react'
import '../Stylesheets/HomePage.css'
import { Header } from "../components/Header";
import ShelterTable from "../components/ShelterTable";
function Shelter(props) {
    const isLoggedIn=props.isLoggedIn
    const accessToken=props.accessToken;
    return (
      <>
        <Header isLoggedIn={isLoggedIn} />
        <ShelterTable accessToken={accessToken} />
        
      </>
    );
}

export default Shelter