import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import NavItems42 from "../NavItems42";
import Frame522 from "../Frame522";
import Frame4 from "../Frame4";
import "./PhysicalModel.css";

function PhysicalModel(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
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
    modeling,
    label6,
    label7,
    arrow3,
    arrow4,
    arrow7,
    label8,
    arrow9,
    xcontinue,
    navItems42Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="physical-model-10 screen">
        <div className="overlap-group4-8">
          <div className="flex-row-52">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-17"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-2-23">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-90">
                <div className="design-75 valign-text-middle inter-medium-sonic-silver-18px">
                  {design}
                </div>
              </div>
              <Frame11322 />
            </div>
          </div>
          <NavItems42
            frame1162Props={navItems42Props.frame1162Props}
            frame1172Props={navItems42Props.frame1172Props}
            frame118Props={navItems42Props.frame118Props}
          />
        </div>
        <div className="flex-row-53">
          <div className="flex-row-54">
            <div className="flex-col-36 inter-medium-rum-swizzle-18-1px">
              <div className="arrow-container-11">
                <img className="arrow-1-9" src={arrow1} alt="Arrow 1" />
                <img className="arrow-2-8" src={arrow2} alt="Arrow 2" />
              </div>
              <div className="ellipse-85-6"></div>
              <div className="rectangle-3-6"></div>
              <div className="frame-4-50"></div>
              <div className="overlap-group2-10">
                <img className="line-2-10" src={line2} alt="Line 2" />
                <div className="ellipse-86-10"></div>
              </div>
              <div className="label-113">{label1}</div>
              <img
                className="text-format-10"
                src={textFormat}
                alt="Text format"
              />
              <div className="label-114">{label2}</div>
            </div>
            <img className="line-1-10" src={line1} alt="Line 1" />
          </div>
          <div className="flex-col-37">
            <div className="flex-row-55">
              <Link to="/functional-view">
                <div className="frame-7-3">
                  <div className="place-229 valign-text-middle inter-bold-tropical-rain-forest-18px">
                    {place}
                  </div>
                </div>
              </Link>
              <p className="click-on-modeling-9 valign-text-middle bevan-normal-white-20px">
                {clickOnModeling}
              </p>
            </div>
            <div className="flex-row-56">
              <div className="flex-col-38 inter-medium-rum-swizzle-18-1px">
                <div className="overlap-group6-3">
                  <div className="label-115">{label3}</div>
                  <img className="arrow-5-7" src={arrow5} alt="Arrow 5" />
                </div>
                <div className="overlap-group-17">
                  <div className="label-116">{label4}</div>
                  <Frame522 />
                  <img className="arrow-6-8" src={arrow6} alt="Arrow 6" />
                </div>
                <div className="overlap-group3-10">
                  <div className="label-117">{label5}</div>
                  <img className="arrow-8-7" src={arrow8} alt="Arrow 8" />
                </div>
                {/* <Link to="https://app.diagrams.net/" target="_blank"> */}
                <div className="frame-9-2">
                  <div className="frame-105-1">
                    <a href="https://app.diagrams.net/" target="_blank">
                      <div className="modeling-84 valign-text-middle inter-bold-mineral-green-18px">
                        {modeling}
                      </div>
                    </a>
                  </div>
                </div>
                {/* </Link> */}
              </div>
              <div className="flex-col-39">
                <div className="overlap-group1-29">
                  <div className="label-118 inter-medium-rum-swizzle-18-1px">
                    {label6}
                  </div>
                  <div className="label-119 inter-medium-rum-swizzle-18-1px">
                    {label7}
                  </div>
                  <Frame4 />
                  <img className="arrow-3-6" src={arrow3} alt="Arrow 3" />
                  <img className="arrow-4-6" src={arrow4} alt="Arrow 4" />
                  <img className="arrow-7-6" src={arrow7} alt="Arrow 7" />
                </div>
                <div className="overlap-group5-6">
                  <div className="label-120 inter-medium-rum-swizzle-18-1px">
                    {label8}
                  </div>
                  <img className="arrow-9-6" src={arrow9} alt="Arrow 9" />
                </div>
                <Link to="/decisional-model">
                  <div className="frame-2-14">
                    <div className="continue-9 valign-text-middle inter-bold-tropical-rain-forest-18px">
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

export default PhysicalModel;
