import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function FormsIndia() {
    const cardData = [
        {
          name: "Completed",
          description: "",
        },
        {
          name: "Pending",
          description: "",
        },
      ];
    
      const links = ["/completedformsindia","/pendingformsindia"];
      const navigate = useNavigate()

    
      return (
        <div className="flex items-center justify-center w-screen pt-44">
          <div className="w-[80vw]">
            {/* <div className="text-center mb-6 w-full mt-3">
              <h1 className="text-3xl font-semibold bg-black text-white p-5 w-full">
                My Tasks
              </h1>
            </div> */}
              <Button className="text-white bg-black mt-4" onClick={() => navigate(-1)}>Go Back</Button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4 sm:p-10">
              {cardData.map((card, index) => (
                <Link
                  key={index}
                  to={`${links[index]}`}
                  className="text-decoration-none"
                >
                  <div className="p-4 bg-amber-600 h-48 border flex flex-col justify-center items-center shadow-xl border-gray-200 transition-transform duration-700 hover:bg-amber-700 hover:border-gray-300">
                    <div className="flex items-center">
                      <h2 className="text-white text-lg md:text-xl lg:text-2xl font-semibold mb-2 cursor-pointer">
                        {card.name}
                      </h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-6 text-white h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ml-4 mb-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-white md:text-base lg:text-lg">
                      {card.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
}

export default FormsIndia