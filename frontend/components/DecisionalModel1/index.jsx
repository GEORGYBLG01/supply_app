import React from "react";
import { Link } from "react-router-dom";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import Frame11322 from "../Frame11322";
import Frame11632 from "../Frame11632";
import Frame1155 from "../Frame1155";
import Frame11722 from "../Frame11722";
import Frame118 from "../Frame118";
import Frame11342 from "../Frame11342";
import "./DecisionalModel1.css";

function DecisionalModel1(props) {
  const {
    x1200PxLogo_Icam__20081,
    aquisition,
    functionalView,
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
    frame11722Props,
    frame118Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="decisional-model-1-1 screen">
        <div className="overlap-group1-21">
          <div className="flex-row-16">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-6"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-2-8">
              <div className="frame-113-41">
                <div className="aquisition-87 valign-text-middle inter-medium-sonic-silver-18px">{aquisition}</div>
              </div>
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
          </div>
          <div className="nav-items-4-4">
            <Link to="/functional-view-1">
              <div className="frame-114-92">
                <div className="functional-view-7 valign-text-middle inter-medium-star-dust-18px">{functionalView}</div>
              </div>
            </Link>
            <Frame11632 />
            <Frame1155 />
            <Frame11722>{frame11722Props.children}</Frame11722>
            <Frame118>{frame118Props.children}</Frame118>
            <Frame11342 />
          </div>
        </div>
        <div className="flex-row-17">
          <div className="flex-col-9 inter-medium-rum-swizzle-18-1px">
            <div className="arrow-container-3">
              <img className="arrow-3-2" src={arrow3} alt="Arrow 3" />
              <img className="arrow-4-2" src={arrow4} alt="Arrow 4" />
            </div>
            <div className="ellipse-85-2"></div>
            <div className="rectangle-3-2"></div>
            <div className="frame-5-7"></div>
            <div className="overlap-group-8">
              <img className="line-2-3" src={line2} alt="Line 2" />
              <div className="ellipse-86-3"></div>
            </div>
            <div className="label-24">{label1}</div>
            <img className="text-format-3" src={textFormat} alt="Text format" />
            <div className="label-25">{label2}</div>
          </div>
          <div className="flex-row-18">
            <div className="flex-row-19">
              <img className="line-1-3" src={line1} alt="Line 1" />
              <Link to="/physical-model-1">
                <div className="frame-11-3">
                  <div className="place-69 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                </div>
              </Link>
            </div>
            <div className="flex-col-10">
              <p className="click-on-modeling-3 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              <div className="frame-container-3">
                <div className="frame-12">
                  <a href="https://app.diagrams.net/" target="_blank">
                    <div className="modeling-85 valign-text-middle inter-bold-mineral-green-18px">{modeling}</div>
                  </a>
                </div>
                <Link to="/process-view-1">
                  <div className="frame-2-3">
                    <div className="continue-2 valign-text-middle inter-bold-tropical-rain-forest-18px">
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

export default DecisionalModel1;
