import React from "react";
import { Link } from "react-router-dom";
import ButtonSecondary from "../ButtonSecondary";
import "./Toggle.css";

function Toggle(props) {
  const { className, buttonSecondaryProps } = props;

  return (
    <div className={`toggle-32 ${className || ""}`}>
      <ButtonSecondary className={buttonSecondaryProps.className}>{buttonSecondaryProps.children}</ButtonSecondary>
    </div>
  );
}

export default Toggle;
