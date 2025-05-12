import React from "react";
import "./Group102.css";

function Group102(props) {
  const { line24, className } = props;

  return (
    <div className={`group-23 ${className || ""}`}>
      <input className="tap-here-7 subtitel" name="taphere" placeholder="tap here" type="text" required />
      <img className="line-24" src={line24} alt="Line 24" />
    </div>
  );
}

export default Group102;
