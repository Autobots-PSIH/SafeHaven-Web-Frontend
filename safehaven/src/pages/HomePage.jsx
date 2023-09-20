import React from "react";
import News from "../components/News";
import BroadcastMessages from "../components/BroadcastMessages";
import '../Stylesheets/HomePage.css'
import HomeMap from "../components/HomeMap";
const Flexible_Column = (props) => {

  return (
    <>
      <div className="flexible-column-container" > 
        <div className="column-left">
          {props.isLoggedIn?<BroadcastMessages accessToken={props.accessToken}/>:<News />}
        </div>
        <div className="column-right">
          <HomeMap/>
        </div>
      </div>
    </>
  );
};

export default Flexible_Column;
