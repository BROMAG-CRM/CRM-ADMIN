import { Link } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";


function TeleSales() {
  const names = [
    "My Tasks",
    "My Report",
  ];
  const links = ["/mytasks","/myreport"]

  return (
    <div className="pl-[18vw]  pt-7 w-screen">
      <div className="pl-6 w-[80vw]">
        <div className="pt-10">
          <div>
            <div className="grid grid-cols-2 gap-4 p-10 ">
              {[
                AssignmentIcon,
                AssessmentIcon,
              ].map((Icon, index) => (
                <Link
                  key={index}
                  to={`${links[index]}`}
                  className={`text-decoration-none`}
                >
                  <div
                    key={index}
                    className={`p-4 h-48 border bg-amber-600 flex flex-col justify-center items-center rounded-2xl hover:bg-amber-700 hover:shadow-md hover:scale-105 transition-transform duration-1000`}
                  >
                    <h2 className="text-white text-2xl font-semibold font- mb-2 cursor-pointer">
                      {names[index]}
                    </h2>
                    <Icon className="text-white cursor-pointer" style={{ fontSize: '4rem' }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeleSales;
