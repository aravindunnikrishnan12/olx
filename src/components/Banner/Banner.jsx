import React, { useRef } from 'react';
import './Banner.css';
import Arrow from '../../assets/Arrow';

function Banner() {
  const optionsRef = useRef(null);

  const handleMouseEnter = () => {
    optionsRef.current.style.animationPlayState = 'paused';
  };

  const handleMouseLeave = () => {
    optionsRef.current.style.animationPlayState = 'running';
  };

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
          <span>ALL CATEGORIES <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"/></svg></span>

            
          </div>
        </div>

        <div className="scrollContainer" 
             onMouseEnter={handleMouseEnter} 
             onMouseLeave={handleMouseLeave}>
          <div className="otherQuickOptions" ref={optionsRef}>
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>

        <div className="banner">
          <img
            src="../../../public/images/banner copy.png"
            alt="Banner"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
