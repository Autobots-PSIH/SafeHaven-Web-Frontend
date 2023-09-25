import React from "react";
import { X, Check } from "lucide-react";
import axios from "axios";

export function RequestsCard(props) {
  const token = props.accessToken;
  console.log(props);

  const iconClick = (req_status) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const body = { request_id: props.request.id, status: req_status };

    axios.post(
      "https://safehaven-backend-production.up.railway.app/api/shelter/update-request-status/",
      body,
      config
    );

    window.location.reload();
  };
  return (
    <>
      {props.request.status === "Pending" ? (
        <div
          className="rounded-md border-l-4 border-black bg-gray-100 p-3"
          style={{ marginBottom: "10px" }}
        >
          <div className="flex items-center justify-between space-x-4">
            <div>
              <span>
                <p className="text-sm font-small" style={{ padding: "5px" }}>
                  <b>Name: </b>
                  {props.requestData.volunteer_details.name} <b>Request: </b>
                  {props.request.quantity} units {props.request.request_type}
                </p>
              </span>

              <p className="text-sm font-small" style={{ padding: "5px" }}>
                <b>Location: </b> {props.requestData.volunteer_details.address}
              </p>
            </div>
            <div>
              <Check
                title="Accept"
                className="h-6 w-6 cursor-pointer"
                style={{ color: "Green" }}
                onClick={() => {
                  iconClick("Accepted");
                }}
              />
              <X
                className="h-6 w-6 cursor-pointer"
                style={{ color: "Red" }}
                onClick={() => {
                  iconClick("Rejected");
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
