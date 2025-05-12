import React from "react";
import "./Frame115.css";
import { Link, useHistory } from "react-router-dom";

function Frame115() {
  return (
    <Link to="/analysis">
      <div className="frame-115">
        <div className="analysis valign-text-middle inter-medium-star-dust-18px">
          Analysis
        </div>
      </div>
    </Link>
  );
}

export default Frame115;
