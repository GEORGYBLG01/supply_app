import React from "react";
import { Link } from "react-router-dom";
import "./HeaderMenuDefault2.css";

function HeaderMenuDefault2(props) {
  const { children, className } = props;

  return (
    <div className={`menu-item-default-20 ${className || ""}`}>
      <div className="label-100 inter-medium-star-dust-14px">{children}</div>
    </div>
  );
}

export default HeaderMenuDefault2;
