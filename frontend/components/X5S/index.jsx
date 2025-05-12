import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import Frame1147 from "../Frame1147";
import Frame1154 from "../Frame1154";
import Frame1164 from "../Frame1164";
import Frame11742 from "../Frame11742";
import Frame118 from "../Frame118";
import "./X5S.css";

function X5S(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
    leanVsm,
    arrow12,
    arrow13,
    line2,
    label1,
    textFormat,
    label2,
    line23,
    place,
    seiri,
    arrow7,
    disposal,
    clickOnModeling,
    arrow3,
    seiton,
    arrow8,
    putAway,
    modeling,
    arrow4,
    seison,
    arrow9,
    clean,
    arrow6,
    seiketsu,
    shitsuke,
    arrow10,
    arrow11,
    arrow5,
    rectangle7,
    standardize,
    respect,
    xcontinue,
    frame118Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="x5s screen">
        <div className="overlap-group3-16">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-59"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-29">
            <div className="nav-items-2-45">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-98">
                <div className="design-79 valign-text-middle inter-medium-sonic-silver-18px">{design}</div>
              </div>
              <Frame11322 />
            </div>
            <div className="nav-items-3-72">
              <Link to="/lean-vsm">
                <div className="frame-113-61">
                  <div className="lean-vsm-10 valign-text-middle inter-medium-star-dust-18px">{leanVsm}</div>
                </div>
              </Link>
              <Frame1147 />
              <Frame1154 />
              <Frame1164 />
              <Frame11742 />
              <Frame118 className={frame118Props.className}>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-111">
          <div className="flex-col-71">
            <div className="arrow-container-17">
              <img className="arrow-12-2" src={arrow12} alt="Arrow 12" />
              <img className="arrow-13-2" src={arrow13} alt="Arrow 13" />
            </div>
            <div className="ellipse-86-16"></div>
            <div className="rectangle-23-1"></div>
            <div className="frame-8-5"></div>
            <div className="rectangle-24-1"></div>
            <div className="group-86">
              <div className="overlap-group-60">
                <img className="line-2-16" src={line2} alt="Line 2" />
                <div className="ellipse-86-17"></div>
              </div>
              <div className="label-140 inter-medium-rum-swizzle-18-1px">{label1}</div>
            </div>
            <div className="group-85">
              <img className="text-format-17" src={textFormat} alt="Text format" />
              <div className="label-141 inter-medium-rum-swizzle-18-1px">{label2}</div>
            </div>
          </div>
          <div className="flex-row-112">
            <img className="line-23" src={line23} alt="Line 23" />
            <div className="flex-col-72">
              <Link to="/lean-vsm" className="align-self-flex-start">
                <div className="frame-5-17">
                  <div className="place-259 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                </div>
              </Link>
              <div className="seiri-1 inter-medium-white-18-1px">{seiri}</div>
              <img className="arrow-7-8" src={arrow7} alt="Arrow 7" />
              <div className="overlap-group2-17">
                <div className="ellipse-87-3"></div>
                <div className="ellipse-89-1"></div>
                <div className="disposal-1 inter-medium-dark-fern-18-1px">{disposal}</div>
              </div>
            </div>
            <div className="flex-col-73">
              <p className="click-on-modeling-15 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              <div className="flex-row-113">
                <div className="flex-col-74">
                  <div className="flex-row-114">
                    <img className="arrow-3-10" src={arrow3} alt="Arrow 3" />
                    <div className="flex-col-75">
                      <div className="seiton-1 inter-medium-white-18-1px">{seiton}</div>
                      <img className="arrow-8-10" src={arrow8} alt="Arrow 8" />
                      <div className="overlap-group5-11">
                        <div className="put-away-1 inter-medium-dark-fern-18-1px">{putAway}</div>
                      </div>
                    </div>
                  </div>
                  <div className="frame-9-5">
                    <a href="https://app.diagrams.net/" target="_blank">
                      <div className="modeling-105 valign-text-middle inter-bold-tropical-rain-forest-18px">
                        {modeling}
                      </div>
                    </a>
                  </div>
                </div>
                <div className="flex-row-115">
                  <img className="arrow-4-10" src={arrow4} alt="Arrow 4" />
                  <div className="flex-col-76">
                    <div className="seison-1 inter-medium-white-18-1px">{seison}</div>
                    <img className="arrow-9-11" src={arrow9} alt="Arrow 9" />
                    <div className="overlap-group4-13">
                      <div className="clean inter-medium-dark-fern-18-1px">{clean}</div>
                    </div>
                  </div>
                  <img className="arrow-6-12" src={arrow6} alt="Arrow 6" />
                  <div className="flex-col-77">
                    <div className="flex-row-116 inter-medium-white-18-1px">
                      <div className="seiketsu-1">{seiketsu}</div>
                      <div className="shitsuke-1">{shitsuke}</div>
                    </div>
                    <div className="arrow-container-18">
                      <img className="arrow-1-13" src={arrow10} alt="Arrow 10" />
                      <img className="arrow-1-13" src={arrow11} alt="Arrow 11" />
                    </div>
                    <div className="overlap-group1-39 inter-medium-dark-fern-18-1px">
                      <div className="rectangle-5-5"></div>
                      <img className="arrow-5-11" src={arrow5} alt="Arrow 5" />
                      <img className="rectangle-7-5" src={rectangle7} alt="Rectangle 7" />
                      <div className="standardize-1">{standardize}</div>
                      <div className="respect-1">{respect}</div>
                    </div>
                    <Link to="/kaizen" className="align-self-flex-start">
                      <div className="frame-2-22">
                        <div className="continue-16 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default X5S;
