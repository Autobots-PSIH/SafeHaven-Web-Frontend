import React, {useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";

import "react-toastify/dist/ReactToastify.css";

export function VerifyCard(props) {
  const volunteers = props.volunteers;
  const token = props.accessToken;
  const [location, setLocation] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getLocationName = (lat, long) => {
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=a1d79a0a1f1f484d89ea1f4a5e3242fa`
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.features.length) {
          setLocation(result.features[0].properties.formatted);
        } else {
          setLocation("No address found");
        }
      });
  };

  getLocationName(volunteers.lat, volunteers.long);

  const onVerify = () => {
    const id = { temp_shelter_id: volunteers.id };
    axios.put(
      "https://disastro-temp-production.up.railway.app/api/shelter/verify-temp-shelt/",
      id,
      config
    );

    window.location.reload();
  };

  return (
    <>
      <div
        className="rounded-md border-l-4 border-black bg-gray-100 p-3"
        style={{ marginBottom: "10px" }}
      >
        <div className="flex items-center justify-between space-x-4">
          <div>
            <span>
              <p className="text-sm font-small" style={{ padding: "5px" }}>
                <b>Name:</b> {volunteers.owner_name}{" "}
                <b style={{ marginInlineStart: "15px" }}>Phone:</b>{" "}
                {volunteers.owner_phone}
              </p>
            </span>
            <p className="text-sm font-small" style={{ padding: "5px" }}>
              <b>Location:</b> {location}
            </p>
          </div>
          <div>
            <Check
              title="Accept"
              onClick={onVerify}
              className="h-6 w-6 cursor-pointer"
              style={{ color: "Green" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
