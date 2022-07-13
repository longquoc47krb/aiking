import React, { useEffect } from "react";
import welcome from "../../assets/banner.jpg";
function Home() {
  return (
    <div className='main'>
      <div className='main-container'>
        <img src={welcome} />
      </div>
    </div>
  );
}

export default Home;
