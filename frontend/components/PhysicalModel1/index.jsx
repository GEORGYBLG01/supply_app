import React from "react";
import { Link } from "react-router-dom";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import Frame11322 from "../Frame11322";
import Frame1163 from "../Frame1163";
import Frame11622 from "../Frame11622";
import Frame11722 from "../Frame11722";
import Frame118 from "../Frame118";
import Frame11342 from "../Frame11342";
import Frame522 from "../Frame522";
import Frame4 from "../Frame4";
import "./PhysicalModel1.css";

function PhysicalModel1(props) {
  const {
    x1200PxLogo_Icam__20081,
    aquisition,
    functionalView,
    arrow1,
    arrow2,
    line2,
    label1,
    textFormat,
    label2,
    line1,
    place,
    clickOnModeling,
    label3,
    arrow5,
    label4,
    arrow6,
    label5,
    label6,
    arrow3,
    arrow4,
    arrow7,
    label7,
    arrow8,
    label8,
    arrow9,
    modeling,
    xcontinue,
    frame11622Props,
    frame11722Props,
    frame118Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="physical-model-1-1 screen">
        <div className="overlap-group4-3">
          <div className="flex-row-11">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-4"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-2-3">
              <div className="frame-113-40">
                <div className="aquisition-86 valign-text-middle inter-medium-sonic-silver-18px">{aquisition}</div>
              </div>
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
          </div>
          <div className="nav-items-4-3">
            <Link to="/functional-view-1">
              <div className="frame-114-91">
                <div className="functional-view-6 valign-text-middle inter-medium-star-dust-18px">{functionalView}</div>
              </div>
            </Link>
            <Frame1163 />
            <Frame11622>{frame11622Props.children}</Frame11622>
            <Frame11722>{frame11722Props.children}</Frame11722>
            <Frame118>{frame118Props.children}</Frame118>
            <Frame11342 />
          </div>
        </div>
        <div className="flex-row-12">
          <div className="flex-row-13">
            <div className="flex-col-6 inter-medium-rum-swizzle-18-1px">
              <div className="arrow-container-2">
                <img className="arrow-1-2" src={arrow1} alt="Arrow 1" />
                <img className="arrow-2-2" src={arrow2} alt="Arrow 2" />
              </div>
              <div className="ellipse-85-1"></div>
              <div className="rectangle-3-1"></div>
              <div className="frame-4-3"></div>
              <div className="overlap-group6-1">
                <img className="line-2-2" src={line2} alt="Line 2" />
                <div className="ellipse-86-2"></div>
              </div>
              <div className="label-16">{label1}</div>
              <img className="text-format-2" src={textFormat} alt="Text format" />
              <div className="label-17">{label2}</div>
            </div>
            <div className="flex-row-14">
              <img className="line-1-2" src={line1} alt="Line 1" />
              <Link to="/functional-view-1">
                <div className="frame-11-2">
                  <div className="place-68 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex-col-7">
            <p className="click-on-modeling-2 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
            <div className="flex-row-15">
              <div className="overlap-group-container-3 inter-medium-rum-swizzle-18-1px">
                <div className="overlap-group1-20">
                  <div className="label-18">{label3}</div>
                  <img className="arrow-5-2" src={arrow5} alt="Arrow 5" />
                </div>
                <div className="overlap-group2-4">
                  <div className="label-19">{label4}</div>
                  <Frame522 />
                  <img className="arrow-6-2" src={arrow6} alt="Arrow 6" />
                </div>
              </div>
              <div className="overlap-group-6">
                <div className="label-20 inter-medium-rum-swizzle-18-1px">{label5}</div>
                <div className="label-21 inter-medium-rum-swizzle-18-1px">{label6}</div>
                <Frame4 />
                <img className="arrow-3-1" src={arrow3} alt="Arrow 3" />
                <img className="arrow-4-1" src={arrow4} alt="Arrow 4" />
                <img className="arrow-7-2" src={arrow7} alt="Arrow 7" />
              </div>
            </div>
            <div className="flex-col-8">
              <div className="overlap-group-container-4 inter-medium-rum-swizzle-18-1px">
                <div className="overlap-group5-1">
                  <div className="label-22">{label7}</div>
                  <img className="arrow-8-2" src={arrow8} alt="Arrow 8" />
                </div>
                <div className="overlap-group3-4">
                  <div className="label-23">{label8}</div>
                  <img className="arrow-9-1" src={arrow9} alt="Arrow 9" />
                </div>
              </div>
              <div className="frame-container-2">
                <div className="frame-105-1">
                  <a href="https://app.diagrams.net/" target="_blank">
                    <div className="modeling-84 valign-text-middle inter-bold-mineral-green-18px">{modeling}</div>
                  </a>
                </div>
                <Link to="/decisional-model-1">
                  <div className="frame-2-2">
                    <div className="continue-1 valign-text-middle inter-bold-tropical-rain-forest-18px">
                      {xcontinue}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhysicalModel1;
