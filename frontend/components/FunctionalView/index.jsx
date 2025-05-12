import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import NavItems4 from "../NavItems4";
import Frame522 from "../Frame522";
import Frame4 from "../Frame4";
import "./FunctionalView.css";

function FunctionalView(props) {
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
    navItems4Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <form
        className="functional-view-10 screen"
        name="form6"
        action="form6"
        method="post"
      >
        <div className="overlap-group2-9">
          <div className="flex-row-45">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-15"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-2-19">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-88">
                <div className="design-74 valign-text-middle inter-medium-sonic-silver-18px">
                  {design}
                </div>
              </div>
              <Frame11322 />
            </div>
          </div>
          <NavItems4
            className={navItems4Props.className}
            frame1162Props={navItems4Props.frame1162Props}
            frame1172Props={navItems4Props.frame1172Props}
            frame118Props={navItems4Props.frame118Props}
          />
        </div>
        <div className="flex-row-46">
          <div className="flex-row-47">
            <div className="flex-col-30 inter-medium-rum-swizzle-18-1px">
              <div className="arrow-container-10">
                <img className="arrow-1-8" src={arrow1} alt="Arrow 1" />
                <img className="arrow-2-7" src={arrow2} alt="Arrow 2" />
              </div>
              <div className="ellipse-85-5"></div>
              <div className="rectangle-3-5"></div>
              <div className="frame-4-49"></div>
              <div className="overlap-group6-2">
                <img className="line-2-9" src={line2} alt="Line 2" />
                <div className="ellipse-86-9"></div>
              </div>
              <div className="label-105">{label1}</div>
              <img
                className="text-format-9"
                src={textFormat}
                alt="Text format"
              />
              <div className="label-106">{label2}</div>
            </div>
            <img className="line-1-9" src={line1} alt="Line 1" />
          </div>
          <div className="flex-col-31">
            <div className="flex-row-48">
              <Link to="/objectives">
                <div className="frame-6-7">
                  <div className="place-76 valign-text-middle inter-bold-tropical-rain-forest-18px">
                    {place}
                  </div>
                </div>
              </Link>
              <p className="click-on-modeling-8 valign-text-middle bevan-normal-white-20px">
                {clickOnModeling}
              </p>
            </div>
            <div className="flex-row-49">
              <div className="flex-col-32 inter-medium-rum-swizzle-18-1px">
                <div className="overlap-group3-9">
                  <div className="label-107">{label3}</div>
                  <img className="arrow-5-6" src={arrow5} alt="Arrow 5" />
                </div>
                <div className="overlap-group1-28">
                  <div className="label-108">{label4}</div>
                  <Frame522 />
                  <img className="arrow-6-7" src={arrow6} alt="Arrow 6" />
                </div>
                <div className="overlap-group4-7">
                  <div className="label-109">{label5}</div>
                  <img className="arrow-8-6" src={arrow8} alt="Arrow 8" />
                </div>
                
                  <div className="frame-10-3">
                  <a href="https://app.diagrams.net/" target="_blank">
                    <div className="modeling-98 valign-text-middle inter-bold-tropical-rain-forest-18px">
                      {modeling}
                    </div>
                    </a>
                  </div>
                
              </div>
              <div className="flex-col-33">
                <div className="overlap-group-15">
                  <div className="label-110 inter-medium-rum-swizzle-18-1px">
                    {label6}
                  </div>
                  <div className="label-111 inter-medium-rum-swizzle-18-1px">
                    {label7}
                  </div>
                  <Frame4 />
                  <img className="arrow-3-5" src={arrow3} alt="Arrow 3" />
                  <img className="arrow-4-5" src={arrow4} alt="Arrow 4" />
                  <img className="arrow-7-5" src={arrow7} alt="Arrow 7" />
                </div>
                <div className="overlap-group5-5">
                  <div className="label-112 inter-medium-rum-swizzle-18-1px">
                    {label8}
                  </div>
                  <img className="arrow-9-5" src={arrow9} alt="Arrow 9" />
                </div>
                <Link to="/physical-model">
                  <div className="frame-2-12">
                    <div className="continue-7 valign-text-middle inter-bold-mineral-green-18px">
                      {xcontinue}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FunctionalView;
