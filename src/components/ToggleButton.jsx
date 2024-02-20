import React, { useState } from "react";

const ToggleButton = () => {
  const [isSunVisible, setIsSunVisible] = useState(true);

  const handleButtonClick = () => {
    setIsSunVisible(!isSunVisible);
  };

  return (
    <div className="toggle-button">
      <div
        className="container"
        aria-label="Toggle color mode"
        title="Toggle color mode"
        onClick={handleButtonClick}
      >
        <div className={`sun ${isSunVisible ? "visible" : ""}`}></div>
        <div className={`moon ${isSunVisible ? "" : "visible"}`}>
          <div className="star"></div>
          <div className="star small"></div>
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
