import React from "react";
import "./HeaderMenuDefault.css";

function HeaderMenuDefault(props) {
  const { children, className } = props;

  return (
    <div className={`menu-item-default ${className || ""}`}>
      <div className="label-4 inter-medium-cultured-pearl-14px">{children}</div>
    </div>
  );
}

export default HeaderMenuDefault;
