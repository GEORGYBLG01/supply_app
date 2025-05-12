import React from "react";
import "./Frame1152.css";
import { Link } from "react-router-dom";

function Frame1152(props) {
  const { className } = props;

  return (
    <Link to="/acquisition">
    <div className={`frame-115-100 ${className || ""}`}>
      <div className="new-case-5 valign-text-middle inter-medium-sonic-silver-18px">New case</div>
    </div>
    </Link>
  );
}

export default Frame1152;
