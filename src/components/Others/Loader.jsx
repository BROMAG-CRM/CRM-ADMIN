import React from 'react';
import image from "../../assets/logo1.png"

function Loader() {
  return (
    <div className="pl-[12vw]  pt-7 w-screen">
      <div className="pl-3 w-[80vw]">
        <div className="pt-10"></div>
    <div className='w-screen h-[100vh] flex justify-center items-center'>
      <img src={image} className='animate-bounce' alt="Loading" />
    </div>
    </div>
    </div>
  );
}

export default Loader;
