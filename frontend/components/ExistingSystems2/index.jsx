import React from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Frame112 from "../Frame112";
import "./ExistingSystems2.css";

function ExistingSystems2(props) {
  const {
    x1200PxLogo_Icam__20081,
    existingSystems,
    x2SupplementaryModels,
    leanVsm,
    x4Kaizen,
    x25S,
    x5Smed,
    x6VisualManagement,
    ellipse116,
    navItems3Props,
    frame112Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="existing-systems-1 screen">
        <div className="overlap-group-78">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-78"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-42">
            <NavItems3
              className={navItems3Props.className}
              frame1172Props={navItems3Props.frame1172Props}
              frame1162Props={navItems3Props.frame1162Props}
              frame1132Props={navItems3Props.frame1132Props}
            />
            <NavItems2 />
          </div>
        </div>
        <div className="existing-systems-3 valign-text-middle bevan-normal-white-20px">{existingSystems}</div>
        <p className="x2-supplementary-models valign-text-middle bevan-normal-white-20px">{x2SupplementaryModels}</p>
        <div className="group-110">
          <div className="frame-container-19">
            <div className="frame-11-11">
              <div className="lean-vsm-16 valign-text-middle inter-bold-mineral-green-18px">{leanVsm}</div>
            </div>
            <div className="frame-11-11">
              <div className="x4-kaizen valign-text-middle inter-bold-mineral-green-18px">{x4Kaizen}</div>
            </div>
          </div>
          <div className="frame-container-20">
            <div className="frame-113-68">
              <div className="x2-5-s valign-text-middle inter-bold-mineral-green-18px">{x25S}</div>
            </div>
            <div className="frame-11-11">
              <div className="x5-smed valign-text-middle inter-bold-mineral-green-18px">{x5Smed}</div>
            </div>
          </div>
          <div className="frame-container-21">
            <Frame112 className={frame112Props.className}>{frame112Props.children}</Frame112>
            <div className="frame-11-11">
              <div className="x6-visual-management valign-text-middle inter-bold-mineral-green-18px">
                {x6VisualManagement}
              </div>
            </div>
          </div>
        </div>
        <img className="ellipse-116-3" src={ellipse116} alt="Ellipse 116" />
      </div>
    </div>
  );
}

export default ExistingSystems2;
