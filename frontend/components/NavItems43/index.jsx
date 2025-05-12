import React from "react";
import Frame11452 from "../Frame11452";
import Frame11632 from "../Frame11632";
import Frame1155 from "../Frame1155";
import Frame11722 from "../Frame11722";
import Frame118 from "../Frame118";
import Frame11342 from "../Frame11342";
import "./NavItems43.css";

function NavItems43(props) {
  const { frame1172Props, frame118Props } = props;

  return (
    <div className="nav-items-4-8">
      <Frame11452 />
      <Frame11632 />
      <Frame1155 />
      <Frame11722>{frame1172Props.children}</Frame11722>
      <Frame118>{frame118Props.children}</Frame118>
      <Frame11342 />
    </div>
  );
}

export default NavItems43;
