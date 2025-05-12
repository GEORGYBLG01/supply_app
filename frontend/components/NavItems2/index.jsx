import React from "react";
import Frame113 from "../Frame113";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import "./NavItems2.css";

function NavItems2(props) {
  const { className } = props;

  return (
    <div className={`nav-items-2-2 ${className || ""}`}>
      <Frame113 />
      <Frame114 />
      <Frame115 />
      <Frame116 />
      <Frame117 />
    </div>
  );
}

export default NavItems2;
