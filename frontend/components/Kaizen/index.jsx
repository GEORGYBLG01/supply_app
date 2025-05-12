import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import Frame1146 from "../Frame1146";
import Frame1157 from "../Frame1157";
import Frame1164 from "../Frame1164";
import Frame11742 from "../Frame11742";
import Frame118 from "../Frame118";
import HeaderMenuDefault from "../HeaderMenuDefault";
import "./Kaizen.css";

function Kaizen(props) {
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
    place1,
    input,
    clickOnModeling,
    arrow5,
    arrow1,
    place2,
    arrow3,
    arrow7,
    act,
    xdo,
    arrow4,
    arrow6,
    check,
    arrow2,
    arrow8,
    modeling,
    xcontinue,
    output,
    frame118Props,
    headerMenuDefault1Props,
    headerMenuDefault2Props,
    headerMenuDefault3Props,
    headerMenuDefault4Props,
    headerMenuDefault5Props,
    headerMenuDefault6Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="kaizen-14 screen">
        <div className="overlap-group4-15">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-62"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-32">
            <div className="nav-items-2-48">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-99">
                <div className="design-80 valign-text-middle inter-medium-sonic-silver-18px">{design}</div>
              </div>
              <Frame11322 />
            </div>
            <div className="nav-items-3-74">
              <Link to="/lean-vsm">
                <div className="frame-113-63">
                  <div className="lean-vsm-12 valign-text-middle inter-medium-star-dust-18px">{leanVsm}</div>
                </div>
              </Link>
              <Frame1146 />
              <Frame1157 />
              <Frame1164 />
              <Frame11742 />
              <Frame118 className={frame118Props.className}>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-121">
          <div className="flex-col-81">
            <div className="arrow-container-19">
              <img className="arrow-12-3" src={arrow12} alt="Arrow 12" />
              <img className="arrow-13-4" src={arrow13} alt="Arrow 13" />
            </div>
            <div className="ellipse-86-18"></div>
            <div className="rectangle-23-2"></div>
            <div className="frame-8-13"></div>
            <div className="rectangle-24-2"></div>
            <div className="group-86-1">
              <div className="overlap-group-63">
                <img className="line-2-17" src={line2} alt="Line 2" />
                <div className="ellipse-86-19"></div>
              </div>
              <div className="label-145 inter-medium-rum-swizzle-18-1px">{label1}</div>
            </div>
            <div className="group-85-1">
              <img className="text-format-19" src={textFormat} alt="Text format" />
              <div className="label-146 inter-medium-rum-swizzle-18-1px">{label2}</div>
            </div>
          </div>
          <div className="flex-row-122">
            <div className="flex-row-123">
              <img className="line-23-1" src={line23} alt="Line 23" />
              <div className="flex-col-82">
                <Link to="/5s" className="align-self-flex-start">
                  <div className="frame-7-5">
                    <div className="place-261 valign-text-middle inter-bold-tropical-rain-forest-18px">{place1}</div>
                  </div>
                </Link>
                <div className="overlap-group8-2">
                  <div className="input-1 valign-text-middle inter-bold-mineral-green-20px">{input}</div>
                </div>
                <HeaderMenuDefault className={headerMenuDefault1Props.className}>
                  {headerMenuDefault1Props.children}
                </HeaderMenuDefault>
              </div>
            </div>
            <div className="flex-col-83">
              <p className="click-on-modeling-16 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              <div className="flex-row-124">
                <img className="arrow-5-12" src={arrow5} alt="Arrow 5" />
                <img className="arrow-1-14" src={arrow1} alt="Arrow 1" />
                <div className="flex-col-84">
                  <div className="overlap-group3-18">
                    <h1 className="place-262 valign-text-middle inter-bold-mineral-green-24px">{place2}</h1>
                  </div>
                  <HeaderMenuDefault className={headerMenuDefault2Props.className}>
                    {headerMenuDefault2Props.children}
                  </HeaderMenuDefault>
                </div>
                <img className="arrow-3-11" src={arrow3} alt="Arrow 3" />
                <img className="arrow-7-9" src={arrow7} alt="Arrow 7" />
              </div>
              <div className="flex-col-85">
                <div className="overlap-group-container-12">
                  <div className="overlap-group9-2">
                    <div className="act-1 valign-text-middle inter-bold-mineral-green-24px">{act}</div>
                  </div>
                  <div className="overlap-group7-3">
                    <div className="do-1 valign-text-middle inter-bold-mineral-green-24px">{xdo}</div>
                  </div>
                </div>
                <div className="flex-row-125">
                  <div className="overlap-group-container-13">
                    <div className="overlap-group5-13">
                      <HeaderMenuDefault className={headerMenuDefault3Props.className}>
                        {headerMenuDefault3Props.children}
                      </HeaderMenuDefault>
                      <img className="arrow-4-11" src={arrow4} alt="Arrow 4" />
                      <img className="arrow-6-14" src={arrow6} alt="Arrow 6" />
                    </div>
                    <div className="overlap-group6-5">
                      <div className="check-1 valign-text-middle inter-bold-mineral-green-24px">{check}</div>
                    </div>
                  </div>
                  <div className="overlap-group2-18">
                    <HeaderMenuDefault className={headerMenuDefault4Props.className}>
                      {headerMenuDefault4Props.children}
                    </HeaderMenuDefault>
                    <img className="arrow-2-12" src={arrow2} alt="Arrow 2" />
                  </div>
                  <img className="arrow-8-11" src={arrow8} alt="Arrow 8" />
                </div>
                <div className="flex-row-126">
                  <div className="frame-5-19">
                    <a href="https://app.diagrams.net/" target="_blank">
                      <div className="modeling-107 valign-text-middle inter-bold-tropical-rain-forest-18px">
                        {modeling}
                      </div>
                    </a>
                  </div>
                  <HeaderMenuDefault className={headerMenuDefault5Props.className}>
                    {headerMenuDefault5Props.children}
                  </HeaderMenuDefault>
                  <Link to="/kaizen1">
                    <div className="frame-2-24">
                      <div className="continue-18 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-col-86">
              <div className="overlap-group1-41">
                <div className="output-1 valign-text-middle inter-bold-mineral-green-20px">{output}</div>
              </div>
              <HeaderMenuDefault className={headerMenuDefault6Props.className}>
                {headerMenuDefault6Props.children}
              </HeaderMenuDefault>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kaizen;
