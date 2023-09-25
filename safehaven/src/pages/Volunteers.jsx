import React, { useEffect, useState } from "react";
import "../Stylesheets/HomePage.css";
import { Header } from "../components/Header";
import axios from "axios";
import VolunteerTable from "../components/VolunteerTable";
import { RequestsCard } from "../components/RequestCard";
import { VerifyCard } from "../components/VerifyCard";

export default function Volunteers(props) {
  const accessToken = props.accessToken;
  const [tp, settp] = useState("");
  const [unverifiedVolunteer, setUnverifiedVolunteer] = useState([]);
  const [volunteer, setVolunteer] = useState([]);
  const [isReq, setIsReq] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const fetchData = () => {
    axios
      .get(
        "https://safehaven-backend-production.up.railway.app/api/shelter/unverified-shelters/",
        config
      )
      .then((response) => {
        setUnverifiedVolunteer(response.data);
      })
      .catch((err) => {
        console.log(err);
        settp("1");
      });
  };

  const fetchRequests = () => {
    axios
      .get(
        "https://safehaven-backend-production.up.railway.app/api/shelter/admin-requests/",
        config
      )
      .then((response) => {
        setVolunteer(response.data);
        response.data.map((item) => {
          if (item.requests.length !== 0) {
            setIsReq(true);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        settp("2");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    fetchRequests();
    console.log(volunteer);
  }, [tp]);

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <div className="flexible-column-container">
        <div className="table">
          <VolunteerTable accessToken={accessToken} />
        </div>

        <div className="request">
          <b>Verify volunteers</b>
          <div className="top">
            {unverifiedVolunteer.length === 0 ? (
              <div className="mt-6 text-center text-gray-700">
                Loading verification requests..
              </div>
            ) : (
              <>
                {unverifiedVolunteer.map((vol) => (
                  <VerifyCard volunteers={vol} accessToken={accessToken} />
                ))}
              </>
            )}
          </div>
          <b>Manage Requests</b>
          <div className="bottom">
            {isReq ? (
              <>
                {volunteer.map(
                  (element, index) =>
                    element.requests.length > 0 && (
                      <div key={index}>
                        {element.requests.map((req, reqIndex) => (
                          <RequestsCard
                            key={reqIndex}
                            requestData={element}
                            request={req}
                            accessToken={accessToken}
                          />
                        ))}
                      </div>
                    )
                )}
              </>
            ) : (
              <div className="mt-6 text-center text-gray-700">
                Loading resource requests...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
