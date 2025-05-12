import React from "react";
import { Link } from "react-router-dom";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import Frame11322 from "../Frame11322";
import NavItems4 from "../NavItems4";
import Frame522 from "../Frame522";
import Frame4 from "../Frame4";
import "./FunctionalView1.css";

function FunctionalView1(props) {
  const {
    x1200PxLogo_Icam__20081,
    aquisition,
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
    arrow8,
    label6,
    label7,
    arrow3,
    arrow4,
    arrow7,
    label8,
    arrow9,
    modeling,
    xcontinue,
    navItems4Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="functional-view-1-1 screen">
        <div className="overlap-group6">
          <div className="flex-row-5">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-2"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-2-1">
              <div className="frame-113-21">
                <div className="aquisition-26 valign-text-middle inter-medium-sonic-silver-18px">
                  {aquisition}
                </div>
              </div>
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
          </div>
          <NavItems4
            frame1162Props={navItems4Props.frame1162Props}
            frame1172Props={navItems4Props.frame1172Props}
            frame118Props={navItems4Props.frame118Props}
          />
        </div>
        <div className="flex-row-6">
          <div className="flex-col-5">
            <div className="flex-row-8">
              <Link to="/visual-management-3">
                <div className="frame-11-1">
                  <div className="place-3 valign-text-middle inter-bold-tropical-rain-forest-18px">
                    {place}
                  </div>
                </div>
              </Link>
              <p className="click-on-modeling-1 valign-text-middle bevan-normal-white-20px">
                {clickOnModeling}
              </p>
            </div>
            <div className="flex-row-9">
              <div className="overlap-group-container-1 inter-medium-rum-swizzle-18-1px">
                <div className="overlap-group-2">
                  <div className="label-10">{label3}</div>
                  <img className="arrow-5-1" src={arrow5} alt="Arrow 5" />
                </div>
                <div className="overlap-group4-2">
                  <div className="label-11">{label4}</div>
                  <Frame522 />
                  <img className="arrow-6-1" src={arrow6} alt="Arrow 6" />
                </div>
                <div className="overlap-group5">
                  <div className="label-12">{label5}</div>
                  <img className="arrow-8-1" src={arrow8} alt="Arrow 8" />
                </div>
              </div>
              <div className="overlap-group-container-2">
                <div className="overlap-group1-19">
                  <div className="label-13 inter-medium-rum-swizzle-18-1px">
                    {label6}
                  </div>
                  <div className="label-14 inter-medium-rum-swizzle-18-1px">
                    {label7}
                  </div>
                  <Frame4 />
                  <img className="arrow-3" src={arrow3} alt="Arrow 3" />
                  <img className="arrow-4" src={arrow4} alt="Arrow 4" />
                  <img className="arrow-7-1" src={arrow7} alt="Arrow 7" />
                </div>
                <div className="overlap-group3-2">
                  <div className="label-15 inter-medium-rum-swizzle-18-1px">
                    {label8}
                  </div>
                  <img className="arrow-9" src={arrow9} alt="Arrow 9" />
                </div>
              </div>
            </div>
            <div className="frame-container-1">
              <div className="frame">
                <a href="https://app.diagrams.net/" target="_blank">
                  <div className="modeling-83 valign-text-middle inter-bold-mineral-green-18px">
                    {modeling}
                  </div>
                </a>
              </div>
              <Link to="/physical-model-1">
                <div className="frame">
                  <div className="continue valign-text-middle inter-bold-mineral-green-18px">
                    {xcontinue}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FunctionalView1;
