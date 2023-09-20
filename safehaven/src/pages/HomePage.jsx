import React from "react";
import News from "../components/News";
import BroadcastMessages from "../components/BroadcastMessages";
import "../Stylesheets/HomePage.css";
import HomeMap from "../components/HomeMap";
import { Header } from "../components/Header";
const HomePage = (props) => {
  const locations = { lat: 19.21833, lng: 72.978088 };
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <div className="flexible-column-container">
        <div className="column-left">
          {props.isLoggedIn ? (
            <BroadcastMessages accessToken={props.accessToken} />
          ) : (
            <News />
          )}
        </div>
        <div className="column-right">
          <HomeMap locations={locations} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
