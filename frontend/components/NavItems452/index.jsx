import React from "react";
import Frame11452 from "../Frame11452";
import Frame11632 from "../Frame11632";
import Frame11622 from "../Frame11622";
import Frame11722 from "../Frame11722";
import Frame1136 from "../Frame1136";
import Frame11342 from "../Frame11342";
import "./NavItems452.css";

function NavItems452(props) {
  const { frame1162Props, frame1172Props, frame1136Props } = props;

  return (
    <div className="nav-items-4">
      <Frame11452 />
      <Frame11632 />
      <Frame11622>{frame1162Props.children}</Frame11622>
      <Frame11722>{frame1172Props.children}</Frame11722>
      <Frame1136>{frame1136Props.children}</Frame1136>
      <Frame11342 />
    </div>
  );
}

export default NavItems452;
