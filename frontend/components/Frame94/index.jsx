import React from "react";
import "./Frame94.css";

function Frame94(props) {
  const { className } = props;

  return (
    <div className={`frame-94 ${className || ""}`}>
      <div className="username subtitel">Username</div>
      <div className="overlap-group2">
        <div className="rectangle-4361"></div>
        <input className="tap-here subtitel" name="taphere" placeholder="Tap here" type="text" required />
      </div>
    </div>
  );
}

export default Frame94;
