import React from "react";
import Frame11452 from "../Frame11452";
import Frame11632 from "../Frame11632";
import Frame11622 from "../Frame11622";
import Frame1173 from "../Frame1173";
import Frame118 from "../Frame118";
import Frame11342 from "../Frame11342";
import "./NavItems44.css";

function NavItems44(props) {
  const { frame1162Props, frame118Props } = props;

  return (
    <div className="nav-items-4-9">
      <Frame11452 />
      <Frame11632 />
      <Frame11622>{frame1162Props.children}</Frame11622>
      <Frame1173 />
      <Frame118>{frame118Props.children}</Frame118>
      <Frame11342 />
    </div>
  );
}

export default NavItems44;
