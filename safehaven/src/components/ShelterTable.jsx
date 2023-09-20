import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
function getColorClass(status) {
  switch (status) {
    case true:
      return "bg-green-100 text-green-800";
    case false:
      return "bg-red-100 text-red-800";
    default:
      return "";
  }}
function ShelterTable(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [shelter, setShelter] = useState([]);
  //const axcs = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MjI1Y2U3LTRiZjEtNGZiNy04MzViLTA4ZjQwNjkyZWExNSIsImV4cCI6MTY5NTIwMjU0Mn0.A-C20SJA2kLBLAsuDlc_Mkwm6uAWNtrmt2e1-gQcY60"; // Replace with your API key
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const accessToken = props.accessToken
  const getLocationName = async (lat, long) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=a1d79a0a1f1f484d89ea1f4a5e3242fa`
      );

      if (response.data.features && response.data.features.length > 0) {
        return response.data.features[0].properties.formatted;
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
    return "Location Not Found";
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://disastro-temp-production.up.railway.app/api/shelter/get_shelter/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Data:", response.data);

      const sheltersWithLocationNames = await Promise.all(
        response.data.data.map(async (shelter) => {
          const locationName = await getLocationName(
            shelter.lat,
            shelter.long
          );
          return { ...shelter, locationName };
        })
      );

      setShelter(sheltersWithLocationNames);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  useEffect(() => {
    fetchData(); 
  }, [currentPage]);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <>
            {shelter.length === 0 ? (
              <div className="mt-6 text-center text-gray-700">
                No shelters found.
              </div>
            ) : (
              <>
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div>
                    <h2 className="text-lg font-semibold text-black">Shelters</h2>
                    <p className="mt-1 text-sm text-gray-700">
                      This is a list of all the existing shelters.
                    </p>
                  </div>
                  <div>
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={() => {
                    navigate("/register-shelter");
                  }}
                >
                  Add new shelter
                </button>
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
                                className="px-8 py-3.5 text-left text-sm font-normal text-gray-500"
                              >
                                <span>Name</span>
                              </th>
                              <th
                                scope="col"
                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                              >
                                Location
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                              >
                                Manager Name
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                              >
                                Manager Number
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                              >
                                Active/Inactive
                              </th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-gray-200 bg-white">
                            {shelter
                              .slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage
                              )
                              .map((shelter) => (
                                <React.Fragment key={shelter.name}>
                                  <tr>
                                    <td className="whitespace-nowrap px-8 py-4">
                                      <div className="text-sm text-gray-900">
                                        {shelter.name}
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-12 py-4">
                                      <div className="text-sm text-gray-900">
                                        {shelter.locationName}
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4">
                                      <div className="text-sm text-gray-900">
                                        {shelter.poc_name}
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4">
                                      <div className="text-sm text-gray-900">
                                        {shelter.poc_contact_number}
                                      </div>
                                    </td>
                                    

                                    <td className="whitespace-nowrap px-4 py-4">
                                <span
                                  className={`inline-flex rounded-full ${getColorClass(
                                    shelter.is_open
                                  )} px-2 text-xs font-semibold leading-5 text-gray-800`}
                                >
                                  {shelter.is_open?"Active":"Inactive"}
                                </span>
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
                      { length: Math.ceil(shelter.length / itemsPerPage) },
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
                    disabled={currentPage === Math.ceil(shelter.length / itemsPerPage)}
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

export default ShelterTable;
