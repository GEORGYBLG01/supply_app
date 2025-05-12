import React from "react";
import "./Frame1142.css";
import { Link } from "react-router-dom";

function Frame1142(props) {
  const { className } = props;

  return (
    <Link to="/home">
    <div className={`frame-114-90 ${className || ""}`}>
      <div className="place-4 valign-text-middle inter-medium-star-dust-18px">Home</div>
    </div>
    </Link>
  );
}

export default Frame1142;
