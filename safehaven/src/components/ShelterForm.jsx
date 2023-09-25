import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function ShelterForm(props) {
  const setShelterLocation  =props.setShelterLocation;
  const accessToken = props.accessToken;
  let navigate = useNavigate();
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const[shelterName,SetShelterName]=useState('');
  const[managerName,SetManagerName]=useState('');
  const[managerNumber,SetManagerNumber]=useState(9);
  const[lati,setLati]=useState(73.9282);
  const[longi,setLongi]=useState(22.81723);
  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        // types: ["(cities)"],
        componentRestrictions: { country: "IN" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();

    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log({ query });

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    console.log({ latLng });
    setLati(latLng.lat);
    setLongi(latLng.lng);
    setShelterLocation(latLng);
  };

  const handleSendClick = async(e) => {
    e.preventDefault(); 
    const requestData = {
      name: shelterName,
      lat: lati,
      long: longi,
      is_open: false,
      poc_name: managerName,
      poc_contact_number:managerNumber
    };
   
    
    axios.post(
      "https://safehaven-backend-production.up.railway.app/api/shelter/create_shelter/",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      console.log(response);
      navigate('/shelters')
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCnWqqVVqGp_Vcar47wuXv23mh4PAhT8n0"}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <section className="rounded-md bg-black/80 p-1">
      <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md w-full">
          <h2 className="text-2xl font-bold leading-tight text-black">
            {" "}
            Create new shelter
          </h2>

          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Shelter Name"
                    id="name"
                    onChange={(event) => SetShelterName(event.target.value)}
                  ></input>
                </div>
              </div>              
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="manager"
                    className="text-base font-medium text-gray-900"
                  >
                    Manager Name
                  </label>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Manager's Name"
                    id="Manager Name"
                    onChange={(event) => SetManagerName(event.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="Manager_Number"
                  className="text-base font-medium text-gray-900"
                >
                  Manager's Number
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Manager's Number"
                    id="Manager_Number"
                    onChange={(event) => SetManagerNumber(event.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="Location"
                  className="text-base font-medium text-gray-900"
                >
                  Shelter Location
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Shelter Location"
                    id="Shelter_Location"
                    ref={autoCompleteRef}
                    onChange={(event) => setQuery(event.target.value)}
                    value={query}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={handleSendClick}
                >
                  Create Shelter <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default ShelterForm;
