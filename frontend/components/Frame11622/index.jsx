import React from "react";
import "./Frame11622.css";
import { Link } from "react-router-dom";

function Frame11622(props) {
  const { children } = props;

  return (
    <Link to="/decisional-model">
      <div className="frame-115-88">
        <div className="decisional-model valign-text-middle inter-medium-star-dust-18px">{children}</div>
      </div>
    </Link>
  );
}

export default Frame11622;
