import React from "react";
import { Link } from "react-router-dom";
import "./HeaderMenuDefault6.css";

function HeaderMenuDefault6({ children, className }) {
  return (
    <div className={`header-menu-default-6 ${className || ""}`}>
      <Link to="/acquisition">
        <div className="label-170 inter-medium-gravel-14px">{children}</div>
      </Link>
    </div>
  );
}

export default HeaderMenuDefault6;
