import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import Frame1146 from "../Frame1146";
import Frame1154 from "../Frame1154";
import Frame1164 from "../Frame1164";
import Frame11742 from "../Frame11742";
import Frame118 from "../Frame118";
import HeaderMenuDefault4 from "../HeaderMenuDefault4";
import "./LeanVSM.css";

function LeanVSM(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
    leanVsm,
    arrow4,
    arrow6,
    arrow5,
    rectangle7,
    xcontinue,
    arrow1,
    arrow2,
    rectangle6,
    line2,
    label1,
    textFormat,
    label2,
    line1,
    place,
    arrow3,
    modeling,
    clickOnModeling,
    frame118Props,
    headerMenuDefault41Props,
    headerMenuDefault42Props,
    headerMenuDefault43Props,
    headerMenuDefault44Props,
    headerMenuDefault45Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="lean-vsm-8 screen">
        <div className="overlap-group2-15">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-57"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-27">
            <div className="nav-items-2-39">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-97">
                <div className="design-78 valign-text-middle inter-medium-sonic-silver-18px">{design}</div>
              </div>
              <Frame11322 />
            </div>
            <div className="nav-items-3-70">
              <Link to="/lean-vsm">
                <div className="frame-113-60">
                  <div className="lean-vsm-9 valign-text-middle inter-medium-white-18px">{leanVsm}</div>
                </div>
              </Link>
              <Frame1146 />
              <Frame1154 />
              <Frame1164 />
              <Frame11742 />
              <Frame118 className={frame118Props.className}>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-105">
          <img className="arrow-4-9" src={arrow4} alt="Arrow 4" />
          <div className="overlap-group3-14">
            <HeaderMenuDefault4>{headerMenuDefault41Props.children}</HeaderMenuDefault4>
          </div>
          <img className="arrow-6-11" src={arrow6} alt="Arrow 6" />
          <div className="flex-col-66">
            <div className="overlap-group1-37">
              <div className="rectangle-5-4"></div>
              <img className="arrow-5-9" src={arrow5} alt="Arrow 5" />
              <img className="rectangle-7-4" src={rectangle7} alt="Rectangle 7" />
              <HeaderMenuDefault4 className={headerMenuDefault42Props.className}>
                {headerMenuDefault42Props.children}
              </HeaderMenuDefault4>
              <HeaderMenuDefault4 className={headerMenuDefault43Props.className}>
                {headerMenuDefault43Props.children}
              </HeaderMenuDefault4>
            </div>
            <Link to="/5s">
              <div className="frame-2-20">
                <div className="continue-14 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex-row-106">
          <div className="flex-col-67 inter-medium-rum-swizzle-18-1px">
            <div className="arrow-container-15">
              <img className="arrow-1-12" src={arrow1} alt="Arrow 1" />
              <img className="arrow-2-11" src={arrow2} alt="Arrow 2" />
            </div>
            <div className="ellipse-88-2"></div>
            <div className="rectangle-3-24"></div>
            <img className="rectangle-6-5" src={rectangle6} alt="Rectangle 6" />
            <div className="overlap-group-58">
              <img className="line-2-14" src={line2} alt="Line 2" />
              <div className="ellipse-86-14"></div>
            </div>
            <div className="label-133">{label1}</div>
            <img className="text-format-15" src={textFormat} alt="Text format" />
            <div className="label-134">{label2}</div>
          </div>
          <img className="line-1-14" src={line1} alt="Line 1" />
        </div>
        <div className="overlap-group4-11">
          <HeaderMenuDefault4 className={headerMenuDefault44Props.className}>
            {headerMenuDefault44Props.children}
          </HeaderMenuDefault4>
        </div>
        <div className="flex-col-68">
          <Link to="/informational-model">
            <div className="frame-6-9">
              <div className="place-257 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
            </div>
          </Link>
          <div className="overlap-group5-9">
            <img className="arrow-3-9" src={arrow3} alt="Arrow 3" />
            <div className="ellipse-87-2"></div>
            <HeaderMenuDefault4 className={headerMenuDefault45Props.className}>
              {headerMenuDefault45Props.children}
            </HeaderMenuDefault4>
          </div>
        </div>
        <div className="frame-10-4">
          <a href="https://app.diagrams.net/" target="_blank">
            <div className="modeling-103 valign-text-middle inter-bold-tropical-rain-forest-18px">{modeling}</div>
          </a>
        </div>
        <p className="click-on-modeling-13 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
      </div>
    </div>
  );
}

export default LeanVSM;
