import React from "react";
import Frame11452 from "../Frame11452";
import Frame1163 from "../Frame1163";
import Frame11622 from "../Frame11622";
import Frame11722 from "../Frame11722";
import Frame118 from "../Frame118";
import Frame11342 from "../Frame11342";
import "./NavItems42.css";

function NavItems42(props) {
  const { frame1162Props, frame1172Props, frame118Props } = props;

  return (
    <div className="nav-items-4-7">
      <Frame11452 />
      <Frame1163 />
      <Frame11622>{frame1162Props.children}</Frame11622>
      <Frame11722>{frame1172Props.children}</Frame11722>
      <Frame118>{frame118Props.children}</Frame118>
      <Frame11342 />
    </div>
  );
}

export default NavItems42;
