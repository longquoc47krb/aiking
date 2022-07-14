/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import welcome from "../../assets/banner.jpg";

function Home() {
  return (
    <div className='main'>
      <div className='main-container'>
        <img src={welcome} />

        <div className='content-container'>
          <p>Download Shop Coin USA App</p>
          <span>Manage crypto assets at your fingertips</span>
          <button className='download'></button>
        </div>
      </div>
    </div>
  );
}

export default Home;
