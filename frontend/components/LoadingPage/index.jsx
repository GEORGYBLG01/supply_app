import React from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Frame112 from "../Frame112";
import "./LoadingPage.css";

function LoadingPage(props) {
  const { x1200PxLogo_Icam__20081, inViewOfTheAnswe, navItems3Props, frame112Props } = props;

  return (
    <div className="container-center-horizontal">
      <div className="loading-page screen">
        <div className="overlap-group-54">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-53"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-23">
            <NavItems3
              className={navItems3Props.className}
              frame1172Props={navItems3Props.frame1172Props}
              frame1162Props={navItems3Props.frame1162Props}
              frame1132Props={navItems3Props.frame1132Props}
            />
            <NavItems2 />
          </div>
        </div>
        <p className="in-view-of-the-answe valign-text-middle bevan-normal-white-20px">{inViewOfTheAnswe}</p>
        <Frame112>{frame112Props.children}</Frame112>
      </div>
    </div>
  );
}

export default LoadingPage;
