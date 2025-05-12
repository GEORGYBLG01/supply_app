import React from "react";
import "./Frame11432.css";
import { Link } from "react-router-dom";

function Frame11432(props) {
  const { className } = props;

  return (
    <Link to="/home">
      <div className={`frame-114-86 ${className || ""}`}>
        <div className="place-1 valign-text-middle inter-medium-sonic-silver-18px">Home</div>
      </div>
    </Link>
  );
}

export default Frame11432;
