import React from "react";
import "./Frame117.css";
import { Link, useHistory } from "react-router-dom";

function Frame117(props) {
  const { className } = props;

  return (
    <Link to="/functional-view">
    <div className={`frame-117-71 ${className || ""}`}>
      <div className="design-1 valign-text-middle inter-medium-star-dust-18px">Design</div>
    </div>
    </Link>
  );
}

export default Frame117;
