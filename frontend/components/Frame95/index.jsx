import React from "react";
import "./Frame95.css";

function Frame95(props) {
  const { className } = props;

  return (
    <div className={`frame-95 ${className || ""}`}>
      <div className="password subtitel">Password</div>
      <div className="overlap-group3">
        <div className="rectangle-4362"></div>
        <input className="tap-here-2 subtitel" name="taphere" placeholder="Tap here" type="password" required />
      </div>
    </div>
  );
}

export default Frame95;
