import React from "react";
import Frame1142 from "../Frame1142";
import Frame1152 from "../Frame1152";
import Frame11722 from "../Frame11722";
import Frame11622 from "../Frame11622";
import Frame11322 from "../Frame11322";
import "./NavItems3.css";

function NavItems3(props) {
  const { className, frame1172Props, frame1162Props, frame1132Props } = props;

  return (
    <div className={`nav-items-3-1 ${className || ""}`}>
      <Frame1142 />
      <Frame1152 />
      <Frame11722>{frame1172Props.children}</Frame11722>
      <Frame11622>{frame1162Props.children}</Frame11622>
      <Frame11322 className={frame1132Props.className} />
    </div>
  );
}

export default NavItems3;
