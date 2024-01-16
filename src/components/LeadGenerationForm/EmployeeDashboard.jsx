import image from "../../assets/logo1.png";

function EmployeeDashboard() {
  return (
    <div className="pt-7 w-screen">
      <div className="w-full md:w-[80vw]">
        <div className="pt-10"></div>
        <div className='w-screen h-[100vh] flex justify-center items-center'>
          <img src={image} className='animate-bounce max-w-full w-96 pl-16' alt="Loading" />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;

