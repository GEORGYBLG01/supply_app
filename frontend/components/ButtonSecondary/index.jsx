import React from "react";
import "./ButtonSecondary.css";

function ButtonSecondary(props) {
  const { children, className } = props;

  return (
    <div className={`button-secondary-101 ${className || ""}`}>
      <div className="label-88 inter-bold-mineral-green-16px">{children}</div>
    </div>
  );
}

export default ButtonSecondary;
