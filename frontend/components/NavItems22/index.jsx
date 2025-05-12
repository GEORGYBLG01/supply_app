import React from "react";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame117 from "../Frame117";
import "./NavItems22.css";

function NavItems22(props) {
  const { className, frame11332Props } = props;

  return (
    <div className={`nav-items-2-20 ${className || ""}`}>
      <Frame11332 className={frame11332Props.className} />
      <Frame114 />
      <Frame115 />
      <div className="frame-116-175">
        <div className="result-objectives-84 valign-text-middle inter-medium-white-18px">Result &amp; Objectives</div>
      </div>
      <Frame117 />
    </div>
  );
}

export default NavItems22;
