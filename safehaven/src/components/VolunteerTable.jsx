import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";

function getColorClass(status) {
  switch (status) {
    case "Accepted":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-red-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
}
function VolunteerTable(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [volunteer, setVolunteer] = useState([]);
  const [location, setLocation] = useState("");
  const [tp, settp] = useState("");
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const accessToken = props.accessToken;
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(
        "https://safehaven-backend-production.up.railway.app/api/shelter/admin-requests/",
        config
      )
      .then((response) => {
        setVolunteer(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        settp("1");
      });
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, tp]);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <>
            {volunteer.length === 0 ? (
              <div className="mt-6 text-center text-gray-700">
                No volunteers found.
              </div>
            ) : (
              <>
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h2 className="text-lg font-semibold text-black">
                      Verified Volunteers
                    </h2>
                    <p className="mt-1 text-sm text-gray-700">
                      This is a list of all the existing verified volunteers.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                              >
                                <span>Name</span>
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                              >
                                Location
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                              >
                                Contact
                              </th>
                              <th
                                scope="col"
                                className="px-8 py-3.5 text-left text-sm font-normal text-gray-500"
                              >
                                Requests
                              </th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-gray-200 bg-white">
                            {volunteer
                              .slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage
                              )
                              .map((volunteer) => (
                                <React.Fragment key={volunteer.name}>
                                  <tr>
                                    <td className="whitespace-nowrap px-4 py-4">
                                      <div className="text-sm text-gray-900">
                                        {volunteer.volunteer_details.name}
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4">
                                      <div className="text-sm text-gray-900">
                                        {volunteer.volunteer_details.address}
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4">
                                      <div className="text-sm text-gray-900">
                                        {volunteer.volunteer_details.phone}
                                      </div>
                                    </td>

                                    <td className="whitespace-nowrap px-8 py-4">
                                      {volunteer.requests.length === 0 ? (
                                        <div className="text-sm text-gray-900">
                                          No requests
                                        </div>
                                      ) : (
                                        <>
                                          {volunteer.requests.map((req) => (
                                            <>
                                              <span
                                                className={`inline-flex rounded-full ${getColorClass(
                                                  req.status
                                                )} px-2 text-xs font-semibold leading-5 text-gray-800`}
                                              >
                                                {req.quantity} units{" "}
                                                {req.request_type} {req.status}
                                              </span>
                                              <br></br>
                                            </>
                                          ))}
                                        </>
                                      )}
                                    </td>
                                  </tr>
                                </React.Fragment>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 rounded-md border bg-black px-5 py-2 text-sm capitalize text-white transition-colors duration-200 hover:bg-gray-700"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>

                  <div className="hidden items-center gap-x-3 md:flex">
                    {Array.from(
                      { length: Math.ceil(volunteer.length / itemsPerPage) },
                      (_, index) => (
                        <button
                          key={index}
                          className={`rounded-md px-2 py-1 text-sm ${
                            index + 1 === currentPage
                              ? "bg-gray-100"
                              : "text-gray-500 hover:bg-gray-100"
                          }`}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={
                      currentPage === Math.ceil(volunteer.length / itemsPerPage)
                    }
                    className="flex items-center gap-x-2 rounded-md border bg-black px-5 py-2 text-sm capitalize text-white transition-colors duration-200 hover:bg-gray-700"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default VolunteerTable;
