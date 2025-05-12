import React from "react";
import { Link } from "react-router-dom";
import "./HeaderMenuDefault5.css";

function HeaderMenuDefault5(props) {
  const { children, className } = props;

  return (
    <Link to="/acquisition">
      <div className={`menu-item-default-30 ${className || ""}`}>
        <div className="label-161 inter-medium-sonic-silver-14px">{children}</div>
      </div>
    </Link>
  );
}

export default HeaderMenuDefault5;
