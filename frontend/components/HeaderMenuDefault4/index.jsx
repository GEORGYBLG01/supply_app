import React from "react";
import "./HeaderMenuDefault4.css";

function HeaderMenuDefault4(props) {
  const { children, className } = props;

  return (
    <div className={`menu-item-default-23-1 ${className || ""}`}>
      <div className="label-135 inter-medium-dark-fern-14px">{children}</div>
    </div>
  );
}

export default HeaderMenuDefault4;
