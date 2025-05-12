import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import HeaderMenuDefault5 from "../HeaderMenuDefault5";
import Frame232 from "../Frame232";
import Frame7 from "../Frame7";
import "./MesureDePerformancesFutures1.css";

function MesureDePerformancesFutures1(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
    label1,
    label2,
    finish,
    headerMenuDefault51Props,
    headerMenuDefault52Props,
    headerMenuDefault53Props,
    frame232Props,
    frame7Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <form className="mesure-de-performances-futures-1 screen" name="form10" action="form10" method="post">
        <div className="overlap-group-77">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-77"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-41">
            <div className="nav-items-2-54">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-107">
                <div className="design-85 valign-text-middle inter-medium-sonic-silver-18px">{design}</div>
              </div>
              <Frame11322 />
            </div>
            <div className="nav-items-1">
              <HeaderMenuDefault5>{headerMenuDefault51Props.children}</HeaderMenuDefault5>
              <HeaderMenuDefault5 className={headerMenuDefault52Props.className}>
                {headerMenuDefault52Props.children}
              </HeaderMenuDefault5>
              <HeaderMenuDefault5 className={headerMenuDefault53Props.className}>
                {headerMenuDefault53Props.children}
              </HeaderMenuDefault5>
              <Frame232 headerMenuDefault2Props={frame232Props.headerMenuDefault2Props} />
              <Link to="/functional-view">
                <div className="label-162 inter-medium-sonic-silver-18-1px">{label1}</div>
              </Link>
              <div className="label-166 inter-medium-gravel-18-1px">{label2}</div>
            </div>
          </div>
        </div>
        <Frame7 className={frame7Props.className} />
        <Link to="/existing-case" className="align-self-flex-end">
          <div className="frame-3-6">
            <div className="finish-1 valign-text-middle inter-bold-tropical-rain-forest-18px">{finish}</div>
          </div>
        </Link>
      </form>
    </div>
  );
}

export default MesureDePerformancesFutures1;
