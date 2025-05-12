import React from "react";
import "./Frame1136.css";

function Frame1136(props) {
  const { children, className } = props;

  return (
    <div className={`frame-118 ${className || ""}`}>
      <div className="informational-model-1 valign-text-middle inter-medium-white-18px">{children}</div>
    </div>
  );
}

export default Frame1136;
