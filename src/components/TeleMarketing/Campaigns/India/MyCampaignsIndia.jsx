import axios from "axios";
import { useEffect, useState } from "react";
const url = import.meta.env.VITE_REACT_APP_URL;
import { get } from "lodash";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function MyCampaignsIndia() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/getassignedindia`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCities(get(response, "data.data.uniqueCities"));
      setData(get(response, "data.data.forms"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pl-[18vw]  pt-7 w-screen">
      <div className="pl-6 w-[80vw]">
        <div>
          <div className="w-full mx-auto mt-8">
            <Button
              className="text-white bg-black mb-4"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>

            <div className="text-center mb-6 w-full">
              <h1 className="text-3xl font-semibold bg-black text-white p-5 w-full">
                My Campaigns
              </h1>
            </div>

            {cities.map((city) => (
              <div key={city} className="mb-6">
                <p className="text- text-2xl font-semibold flex mt-2 mb-3">
                  {city} Leads
                </p>
                <div className="flex flex-col lg:flex-row justify-around gap-5">
                  <div className="mb-4 lg:mb-0 w-full lg:w-1/4 bg-amber-600 border cursor-pointer border-gray-300 p-4 rounded-md transition-transform duration-300 transform hover:scale-105 hover:shadow-md">
                    <p className="text-white text-xl font-extrabold flex items-center justify-center">
                      New Leads
                    </p>
                    <p className="text-white text-xl font-extrabold flex items-center justify-center">
                      {
                        data.filter((form) =>
                          form.address.some(
                            (address) =>
                              address.locationCity === city &&
                              form.leadStatus === "new-lead"
                          )
                        ).length
                      }
                    </p>
                  </div>
                  <div className="mb-4 lg:mb-0 w-full lg:w-1/4 bg-amber-600 border cursor-pointer border-gray-300 p-4 rounded-md transition-transform duration-300 transform hover:scale-105 hover:shadow-md">
                    <p className="text-white text-xl flex font-extrabold items-center justify-center">
                      Opened
                    </p>
                    <p className="text-white text-xl flex font-extrabold items-center justify-center">
                      {
                        data.filter((form) =>
                          form.address.some(
                            (address) =>
                              address.locationCity === city &&
                              (form.leadStatus === "connected" ||
                                form.leadStatus === "follow-up" ||
                                form.leadStatus === "not-connected")
                          )
                        ).length
                      }
                    </p>
                  </div>
                  <div className="mb-4 lg:mb-0 w-full lg:w-1/4 bg-amber-600 border cursor-pointer border-gray-300 p-4 rounded-md transition-transform duration-300 transform hover:scale-105 hover:shadow-md">
                    <p className="text-white text-xl font-extrabold flex items-center justify-center">
                      Follow Up
                    </p>
                    <p className="text-white text-xl font-extrabold flex items-center justify-center">
                      {
                        data.filter((form) =>
                          form.address.some(
                            (address) =>
                              address.locationCity === city &&
                              form.leadStatus === "follow-up"
                          )
                        ).length
                      }{" "}
                    </p>
                  </div>
                  <div className="mb-4 lg:mb-0 w-full lg:w-1/4 bg-amber-600 border cursor-pointer border-gray-300 p-4 rounded-md transition-transform duration-300 transform hover:scale-105 hover:shadow-md">
                    <p className="text-white text-xl font-extrabold flex items-center justify-center">
                      Connected
                    </p>
                    <p className="text-white text-xl font-extrabold flex items-center justify-center">
                      {
                        data.filter((form) =>
                          form.address.some(
                            (address) =>
                              address.locationCity === city &&
                              form.leadStatus === "connected"
                          )
                        ).length
                      }{" "}
                    </p>
                  </div>
                  <div className="w-full lg:w-1/4 bg-amber-600 border cursor-pointer border-gray-300 p-4 rounded-md transition-transform duration-300 transform hover:scale-105 hover:shadow-md">
                    <p className="text-white text-xl font-extrabold flex items-center justify-center">
                      Not Connected
                    </p>
                    <p className="text-white text-xl font-extrabold flex items-center justify-center">
                      {
                        data.filter((form) =>
                          form.address.some(
                            (address) =>
                              address.locationCity === city &&
                              form.leadStatus === "not-connected"
                          )
                        ).length
                      }{" "}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCampaignsIndia;
