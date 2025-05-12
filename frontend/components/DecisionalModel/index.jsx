import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import NavItems43 from "../NavItems43";
import "./DecisionalModel.css";

function DecisionalModel(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
    arrow3,
    arrow4,
    line2,
    label1,
    textFormat,
    label2,
    line1,
    place,
    clickOnModeling,
    modeling,
    xcontinue,
    navItems43Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="decisional-model-10 screen">
        <div className="overlap-group-18">
          <div className="flex-row-57">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-18"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-2-25">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-91">
                <div className="design-76 valign-text-middle inter-medium-sonic-silver-18px">
                  {design}
                </div>
              </div>
              <Frame11322 />
            </div>
          </div>
          <NavItems43
            frame1172Props={navItems43Props.frame1172Props}
            frame118Props={navItems43Props.frame118Props}
          />
        </div>
        <div className="flex-row-58">
          <div className="flex-col-40 inter-medium-rum-swizzle-18-1px">
            <div className="arrow-container-12">
              <img className="arrow-3-7" src={arrow3} alt="Arrow 3" />
              <img className="arrow-4-7" src={arrow4} alt="Arrow 4" />
            </div>
            <div className="ellipse-85-7"></div>
            <div className="rectangle-3-7"></div>
            <div className="frame-5-12"></div>
            <div className="overlap-group1-30">
              <img className="line-2-11" src={line2} alt="Line 2" />
              <div className="ellipse-86-11"></div>
            </div>
            <div className="label-121">{label1}</div>
            <img
              className="text-format-11"
              src={textFormat}
              alt="Text format"
            />
            <div className="label-122">{label2}</div>
          </div>
          <div className="flex-row-59">
            <div className="flex-row-60">
              <img className="line-1-11" src={line1} alt="Line 1" />
              <Link to="/physical-model">
                <div className="frame-8-3">
                  <div className="place-230 valign-text-middle inter-bold-tropical-rain-forest-18px">
                    {place}
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex-col-41">
              <p className="click-on-modeling-10 valign-text-middle bevan-normal-white-20px">
                {clickOnModeling}
              </p>
              <div className="frame-container-8">
                <a href="https://app.diagrams.net/" target="_blank">
                  <div className="frame-9-3">
                    <div className="modeling-100 valign-text-middle inter-bold-tropical-rain-forest-18px">
                      {modeling}
                    </div>
                  </div>
                </a>
                <Link to="/process-view">
                  <div className="frame-2-15">
                    <div className="continue-10 valign-text-middle inter-bold-tropical-rain-forest-18px">
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

export default DecisionalModel;
