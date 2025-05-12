import React from "react";
import Frame11632 from "../Frame11632";
import Frame11622 from "../Frame11622";
import Frame11722 from "../Frame11722";
import Frame118 from "../Frame118";
import Frame11342 from "../Frame11342";
import "./NavItems4.css";

function NavItems4(props) {
  const { className, frame1162Props, frame1172Props, frame118Props } = props;

  return (
    <div className={`nav-items-4-1 ${className || ""}`}>
      <div className="frame-114-88">
        <div className="functional-view-4 valign-text-middle inter-medium-white-18px">Functional view</div>
      </div>
      <Frame11632 />
      <Frame11622>{frame1162Props.children}</Frame11622>
      <Frame11722>{frame1172Props.children}</Frame11722>
      <Frame118>{frame118Props.children}</Frame118>
      <Frame11342 />
    </div>
  );
}

export default NavItems4;
