import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Frame112.css";

function Frame112(props) {
  const { children, className } = props;

  return (
    <div className={`frame-112-6 ${className || ""}`}>
      <div className="click-here valign-text-middle inter-bold-mineral-green-18px">{children}</div>
    </div>
  );
}

export default Frame112;
