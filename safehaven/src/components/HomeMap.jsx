import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import map from '../images/map-location.svg'

const HomeMap = ({ locations }) => {
  const [allLocations, setAllLocations] = useState({
    shelters: [],
    temp_shelters: [],
  });

  useEffect(() => {
    axios
      .get(
        "https://safehaven-backend-production.up.railway.app/api/shelter/get-all-shelters-noauth/"
      )
      .then((response) => {
        setAllLocations(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const tempShelters = allLocations.temp_shelters;
  const permShelters = allLocations.shelters;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCnWqqVVqGp_Vcar47wuXv23mh4PAhT8n0",
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div style={{}}>
      {/* <h1 style={{ margin:'2px', display:'inline-flex'}}><img src={map} style={{height:'16px', margin: '2px'}}></img><b>Shelter Map</b></h1> */}
      <GoogleMap
        mapContainerStyle={{
          height: "90vh",
        }}
        center={{
          lat: 22.998852,
          lng: 81.46583,
        }}
        zoom={5}
        onLoad={onMapLoad}
      >
        {tempShelters.map((loc) =>
          loc.status === "Unverified" ? (
            <MarkerF
              position={{ lat: loc.lat, lng: loc.long }}
              icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
            />
          ) : (
            <MarkerF
              position={{ lat: loc.lat, lng: loc.long }}
              icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
            />
          )
        )}

        {permShelters.map((loc) =>
          loc.is_open ? (
            <MarkerF
              label={loc.name}
              position={{ lat: loc.lat, lng: loc.long }}
              icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
            />
          ) : (
            <></>
          )
        )}
      </GoogleMap>
    </div>
  );
};

export default HomeMap;
