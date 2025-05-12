import React from "react";
import "./Frame116.css";
import { Link } from "react-router-dom";

function Frame116(props) {
  const { children, className } = props;

  return (
    <Link to="/cur-performance">
      <div className={`frame-116 ${className || ""}`}>
        <div className="result-performance valign-text-middle inter-medium-white-18px">{children}</div>
      </div>
    </Link>
  );
}

export default Frame116;
