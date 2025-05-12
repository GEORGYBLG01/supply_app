import React from "react";
import HeaderMenuDefault2 from "../HeaderMenuDefault2";
import "./Frame232.css";

function Frame232(props) {
  const { headerMenuDefault2Props } = props;

  return (
    <div className="frame-2-7">
      <HeaderMenuDefault2 className={headerMenuDefault2Props.className}>
        {headerMenuDefault2Props.children}
      </HeaderMenuDefault2>
    </div>
  );
}

export default Frame232;
