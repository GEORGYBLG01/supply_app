import React from "react";
import "./Ouinon.css";

function Ouinon(props) {
  const { yes, place, className } = props;

  return (
    <div className={`ouinon-45 ${className || ""}`}>
      <div className="frame-4-5">
        <div className="yes subtitel">{yes}</div>
      </div>
      <div className="frame-4-6">
        <div className="place-80 subtitel">{place}</div>
      </div>
    </div>
  );
}

export default Ouinon;
