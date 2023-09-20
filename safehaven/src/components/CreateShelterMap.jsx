import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const CreateShelterMap = ({ location }) => {
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
    <div>
      <GoogleMap
        mapContainerStyle={{
          height: "90vh",
        }}
        center={{ lat: 22.998852, lng: 81.46583 }}
        zoom={5}
        onLoad={onMapLoad}
      >
        <MarkerF
          position={location}
          icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
        />
      </GoogleMap>
    </div>
  );
};

export default CreateShelterMap;
