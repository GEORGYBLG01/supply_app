import React from "react";
import "./HeaderMenuDefault32.css";

function HeaderMenuDefault32(props) {
  const { inputPlaceholder, className } = props;

  return (
    <div className={`menu-item-default-13 ${className || ""}`}>
      <textarea
        className="label-95 inter-medium-dark-fern-14px"
        name="label"
        placeholder={inputPlaceholder}
        type="text"
      ></textarea>
    </div>
  );
}

export default HeaderMenuDefault32;
