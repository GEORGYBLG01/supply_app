import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame1144 from "../Frame1144";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import Frame11322 from "../Frame11322";
import Frame1146 from "../Frame1146";
import Frame1154 from "../Frame1154";
import Frame1164 from "../Frame1164";
import Frame11742 from "../Frame11742";
import Frame118 from "../Frame118";
import HeaderMenuDefault32 from "../HeaderMenuDefault32";
import MenuItemDefault from "../MenuItemDefault";
import "./LeanVSM1.css";

function LeanVSM1(props) {
  const {
    x1200PxLogo_Icam__20081,
    leanVsm,
    arrow1,
    arrow2,
    rectangle6,
    line2,
    label1,
    textFormat,
    label2,
    line1,
    place,
    clickOnModeling,
    arrow3,
    modeling,
    arrow4,
    arrow6,
    arrow5,
    rectangle7,
    xcontinue,
    frame118Props,
    headerMenuDefault321Props,
    menuItemDefaultProps,
    headerMenuDefault322Props,
    headerMenuDefault323Props,
    headerMenuDefault324Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="lean-vsm-1 screen">
        <div className="overlap-group-11">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-11"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-2">
            <div className="nav-items-2-15">
              <Frame11332 />
              <Frame1144 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
            <div className="nav-items-3-63">
              <div className="frame-113-45">
                <div className="lean-vsm valign-text-middle inter-medium-white-18px">{leanVsm}</div>
              </div>
              <Frame1146 />
              <Frame1154 />
              <Frame1164 />
              <Frame11742 />
              <Frame118 className={frame118Props.className}>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-33">
          <div className="flex-col-18 inter-medium-rum-swizzle-18-1px">
            <div className="arrow-container-6">
              <img className="arrow-1-5" src={arrow1} alt="Arrow 1" />
              <img className="arrow-2-5" src={arrow2} alt="Arrow 2" />
            </div>
            <div className="ellipse-88"></div>
            <div className="rectangle-3-3"></div>
            <img className="rectangle-6-1" src={rectangle6} alt="Rectangle 6" />
            <div className="overlap-group3-6">
              <img className="line-2-6" src={line2} alt="Line 2" />
              <div className="ellipse-86-6"></div>
            </div>
            <div className="label-37">{label1}</div>
            <img className="text-format-6" src={textFormat} alt="Text format" />
            <div className="label-94">{label2}</div>
          </div>
          <div className="flex-row-34">
            <img className="line-1-6" src={line1} alt="Line 1" />
            <div className="flex-col-19">
              <div className="flex-row-35">
                <Link to="/informational-model-1">
                  <div className="frame-11-6">
                    <div className="place-72 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                  </div>
                </Link>
                <p className="click-on-modeling-5 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              </div>
              <div className="flex-row-36">
                <div className="overlap-group5-3">
                  <HeaderMenuDefault32 inputPlaceholder={headerMenuDefault321Props.inputPlaceholder} />
                </div>
                <img className="arrow-3-3" src={arrow3} alt="Arrow 3" />
                <div className="flex-col-20">
                  <div className="overlap-group4-5">
                    <MenuItemDefault headerMenuDefault3Props={menuItemDefaultProps.headerMenuDefault3Props} />
                  </div>
                  <div className="frame-12-2">
                    <a href="https://app.diagrams.net/" target="_blank">
                      <div className="modeling-87 valign-text-middle inter-bold-mineral-green-18px">{modeling}</div>
                    </a>
                  </div>
                </div>
                <img className="arrow-4-3" src={arrow4} alt="Arrow 4" />
                <div className="overlap-group2-6">
                  <HeaderMenuDefault32
                    inputPlaceholder={headerMenuDefault322Props.inputPlaceholder}
                    className={headerMenuDefault322Props.className}
                  />
                </div>
                <img className="arrow-6-5" src={arrow6} alt="Arrow 6" />
                <div className="flex-col-21">
                  <div className="overlap-group1-24">
                    <div className="rectangle-5-1"></div>
                    <img className="arrow-5-4" src={arrow5} alt="Arrow 5" />
                    <img className="rectangle-7-1" src={rectangle7} alt="Rectangle 7" />
                    <HeaderMenuDefault32
                      inputPlaceholder={headerMenuDefault323Props.inputPlaceholder}
                      className={headerMenuDefault323Props.className}
                    />
                    <HeaderMenuDefault32
                      inputPlaceholder={headerMenuDefault324Props.inputPlaceholder}
                      className={headerMenuDefault324Props.className}
                    />
                  </div>
                  <Link to="/5s-1">
                    <div className="frame-2-5">
                      <div className="continue-4 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeanVSM1;
