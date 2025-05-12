import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame1144 from "../Frame1144";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import Frame1135 from "../Frame1135";
import Frame1146 from "../Frame1146";
import Frame1157 from "../Frame1157";
import Frame1164 from "../Frame1164";
import Frame11742 from "../Frame11742";
import Frame118 from "../Frame118";
import Frame8 from "../Frame8";
import Frame82 from "../Frame82";
import Frame9 from "../Frame9";
import "./Kaizen11.css";

function Kaizen11(props) {
  const {
    x1200PxLogo_Icam__20081,
    label1,
    overlapGroup11,
    arrow9,
    overlapGroup3,
    arrow10,
    line4,
    line2,
    label2,
    label3,
    overlapGroup2,
    textFormat,
    label4,
    label5,
    overlapGroup4,
    line1,
    place,
    label6,
    x1IdentificationOf,
    x2StudyOfTheSituation,
    arrow6,
    x6AuditOfCountermeasures,
    arrow16,
    arrow13,
    arrow14,
    arrow15,
    arrow17,
    x7StandardizationOfGoodMeasures,
    modeling,
    xcontinue,
    frame11332Props,
    frame11322Props,
    frame118Props,
    frame8Props,
    frame82Props,
    frame9Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="kaizen1-1 screen">
        <div className="overlap-group7-4">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-74"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-39">
            <div className="nav-items-2-53">
              <Frame11332 className={frame11332Props.className} />
              <Frame1144 />
              <Frame115 />
              <Frame116 />
              <Link to="/functional-view">
                <div className="label-159 inter-medium-star-dust-18-1px">{label1}</div>
              </Link>
              <Frame11322 className={frame11322Props.className} />
            </div>
            <div className="nav-items-3-78">
              <Frame1135 />
              <Frame1146 />
              <Frame1157 />
              <Frame1164 />
              <Frame11742 />
              <Frame118 className={frame118Props.className}>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-140">
          <div className="flex-col-99 inter-medium-rum-swizzle-18-1px">
            <div className="overlap-group-container-15">
              <div className="overlap-group11-2" style={{ backgroundImage: `url(${overlapGroup11})` }}>
                <img className="arrow-9-15" src={arrow9} alt="Arrow 9" />
              </div>
              <div className="overlap-group3-23" style={{ backgroundImage: `url(${overlapGroup3})` }}>
                <img className="arrow-10-9" src={arrow10} alt="Arrow 10" />
              </div>
            </div>
            <div className="ellipse-container-1">
              <div className="ellipse-87-6"></div>
              <div className="ellipse-85-15"></div>
            </div>
            <div className="rectangle-10-5"></div>
            <div className="overlap-group10-1">
              <div className="frame-5-23"></div>
            </div>
            <div className="overlap-group6-6">
              <img className="line-6" src={line4} alt="Line 4" />
              <div className="ellipse-8-2"></div>
              <img className="line-6" src={line2} alt="Line 2" />
              <div className="ellipse-8-2"></div>
            </div>
            <div className="label-container-4">
              <div className="label-158">{label2}</div>
              <div className="label-158">{label3}</div>
            </div>
            <div className="overlap-group2-25" style={{ backgroundImage: `url(${overlapGroup2})` }}>
              <img className="text-format-23" src={textFormat} alt="Text format" />
            </div>
            <div className="label-container-5">
              <div className="label-158">{label4}</div>
              <div className="label-158">{label5}</div>
            </div>
          </div>
          <div className="flex-row-141">
            <div className="overlap-group4-17" style={{ backgroundImage: `url(${overlapGroup4})` }}>
              <img className="line-1-18" src={line1} alt="Line 1" />
            </div>
            <div className="flex-col-100">
              <div className="flex-row-142">
                <Link to="/kaizen-1" className="align-self-flex-end">
                  <div className="frame-12-7">
                    <div className="place-270 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                  </div>
                </Link>
                <div className="label-160 inter-medium-cultured-pearl-20px">{label6}</div>
              </div>
              <div className="overlap-group12-4 inter-medium-dark-fern-18-1px">
                <div className="frame-7-11">
                  <p className="x1-identification-of inter-medium-dark-fern-18-1px">{x1IdentificationOf}</p>
                </div>
                <div className="overlap-group9-3">
                  <div className="frame-8-18">
                    <p className="x2-study-of-the-situation">{x2StudyOfTheSituation}</p>
                  </div>
                  <img className="arrow-6-15" src={arrow6} alt="Arrow 6" />
                </div>
                <div className="overlap-group5-14">
                  <div className="frame-10-8">
                    <div className="x6-audit-of-countermeasures">{x6AuditOfCountermeasures}</div>
                  </div>
                  <Frame8>{frame8Props.children}</Frame8>
                  <Frame82>{frame82Props.children}</Frame82>
                  <Frame9>{frame9Props.children}</Frame9>
                  <img className="arrow-16-5" src={arrow16} alt="Arrow 16" />
                  <img className="arrow-13-8" src={arrow13} alt="Arrow 13" />
                  <img className="arrow-14-5" src={arrow14} alt="Arrow 14" />
                  <img className="arrow-15-5" src={arrow15} alt="Arrow 15" />
                </div>
              </div>
              <img className="arrow-17-3" src={arrow17} alt="Arrow 17" />
              <div className="frame-container-18">
                <div className="frame-8-19">
                  <div className="x7-standardization-of-good-measures inter-medium-dark-fern-18-1px">
                    {x7StandardizationOfGoodMeasures}
                  </div>
                </div>
                <div className="frame-13-4">
                  <a href="https://app.diagrams.net/" target="_blank">
                    <div className="modeling-111 valign-text-middle inter-bold-mineral-green-18px">{modeling}</div>
                  </a>
                </div>
                <Link to="/smed-1">
                  <div className="frame-2-29">
                    <div className="continue-22 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
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

export default Kaizen11;
