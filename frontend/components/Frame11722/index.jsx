import React from "react";
import "./Frame11722.css";
import { Link } from "react-router-dom";

function Frame11722(props) {
  const { children } = props;

  return (
    <Link to="/process-view">
      <div className="frame-117-1">
        <div className="process-view valign-text-middle inter-medium-star-dust-18px">{children}</div>
      </div>
    </Link>
  );
}

export default Frame11722;
