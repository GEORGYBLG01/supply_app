import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame1144 from "../Frame1144";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import Frame11322 from "../Frame11322";
import Frame1135 from "../Frame1135";
import Frame1146 from "../Frame1146";
import Frame1157 from "../Frame1157";
import Frame1164 from "../Frame1164";
import Frame11742 from "../Frame11742";
import Frame118 from "../Frame118";
import HeaderMenuDefault from "../HeaderMenuDefault";
import "./Kaizen1.css";

function Kaizen1(props) {
  const {
    x1200PxLogo_Icam__20081,
    overlapGroup11,
    arrow9,
    overlapGroup4,
    arrow10,
    line4,
    line2,
    label1,
    label2,
    overlapGroup8,
    textFormat,
    label3,
    label4,
    overlapGroup17,
    line1,
    place,
    clickOnModeling,
    inputType1,
    inputPlaceholder1,
    arrow5,
    arrow1,
    inputType2,
    inputPlaceholder2,
    arrow3,
    arrow7,
    inputType3,
    inputPlaceholder3,
    inputType4,
    inputPlaceholder4,
    inputType5,
    inputPlaceholder5,
    arrow4,
    arrow6,
    modeling,
    arrow2,
    arrow8,
    xcontinue,
    inputType6,
    inputPlaceholder6,
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
      <div className="kaizen-1-1 screen">
        <div className="overlap-group7-2">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-54"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-24">
            <div className="nav-items-2-36">
              <Frame11332 />
              <Frame1144 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
            <div className="nav-items-3-68">
              <Frame1135 />
              <Frame1146 />
              <Frame1157 />
              <Frame1164 />
              <Frame11742 />
              <Frame118 className={frame118Props.className}>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-95">
          <div className="flex-col-53 inter-medium-rum-swizzle-18-1px">
            <div className="overlap-group-container-7">
              <div className="overlap-group11" style={{ backgroundImage: `url(${overlapGroup11})` }}>
                <img className="arrow-9-8" src={arrow9} alt="Arrow 9" />
              </div>
              <div className="overlap-group4-10" style={{ backgroundImage: `url(${overlapGroup4})` }}>
                <img className="arrow-10-3" src={arrow10} alt="Arrow 10" />
              </div>
            </div>
            <div className="overlap-group2-13">
              <div className="ellipse-85-9"></div>
            </div>
            <div className="overlap-group13-2">
              <div className="rectangle-9-1"></div>
            </div>
            <div className="overlap-group9">
              <div className="frame-5-14"></div>
            </div>
            <div className="overlap-group5-8">
              <img className="line" src={line4} alt="Line 4" />
              <div className="ellipse-8"></div>
              <img className="line" src={line2} alt="Line 2" />
              <div className="ellipse-8"></div>
            </div>
            <div className="label-container">
              <div className="label-130">{label1}</div>
              <div className="label-130">{label2}</div>
            </div>
            <div className="overlap-group8" style={{ backgroundImage: `url(${overlapGroup8})` }}>
              <img className="text-format-13" src={textFormat} alt="Text format" />
            </div>
            <div className="label-container-1">
              <div className="label-130">{label3}</div>
              <div className="label-130">{label4}</div>
            </div>
          </div>
          <div className="flex-row-96">
            <div className="overlap-group17" style={{ backgroundImage: `url(${overlapGroup17})` }}>
              <img className="line-1-13" src={line1} alt="Line 1" />
            </div>
            <div className="flex-col-54">
              <div className="flex-row-97">
                <Link to="/5s-1" className="align-self-flex-end">
                  <div className="frame-13-2">
                    <div className="place-252 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                  </div>
                </Link>
                <p className="click-on-modeling-11 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              </div>
              <div className="flex-row-98">
                <div className="flex-col-55">
                  <div className="overlap-group1-35">
                    <input
                      className="input inter-bold-mineral-green-20px"
                      name="input"
                      placeholder={inputPlaceholder1}
                      type={inputType1}
                    />
                  </div>
                  <HeaderMenuDefault className={headerMenuDefault1Props.className}>
                    {headerMenuDefault1Props.children}
                  </HeaderMenuDefault>
                </div>
                <div className="flex-col-56">
                  <div className="flex-row-99">
                    <img className="arrow-5-8" src={arrow5} alt="Arrow 5" />
                    <img className="arrow-1-11" src={arrow1} alt="Arrow 1" />
                    <div className="flex-col-57">
                      <div className="overlap-group15-1">
                        <input
                          className="plan inter-bold-mineral-green-24px"
                          name="plan"
                          placeholder={inputPlaceholder2}
                          type={inputType2}
                        />
                      </div>
                      <HeaderMenuDefault className={headerMenuDefault2Props.className}>
                        {headerMenuDefault2Props.children}
                      </HeaderMenuDefault>
                    </div>
                    <img className="arrow-3-8" src={arrow3} alt="Arrow 3" />
                    <img className="arrow-7-7" src={arrow7} alt="Arrow 7" />
                  </div>
                  <div className="flex-col-58">
                    <div className="overlap-group-container-8">
                      <div className="overlap-group6-4">
                        <input
                          className="act inter-bold-mineral-green-24px"
                          name="act"
                          placeholder={inputPlaceholder3}
                          type={inputType3}
                        />
                      </div>
                      <div className="overlap-group-55">
                        <input
                          className="do inter-bold-mineral-green-24px"
                          name="do"
                          placeholder={inputPlaceholder4}
                          type={inputType4}
                        />
                      </div>
                    </div>
                    <div className="flex-row-100">
                      <div className="flex-col-59">
                        <div className="overlap-group-container-9">
                          <div className="overlap-group16-2">
                            <HeaderMenuDefault className={headerMenuDefault3Props.className}>
                              {headerMenuDefault3Props.children}
                            </HeaderMenuDefault>
                            <div className="rectangle-6-4"></div>
                            <input
                              className="check inter-bold-mineral-green-24px"
                              name="check"
                              placeholder={inputPlaceholder5}
                              type={inputType5}
                            />
                          </div>
                          <div className="overlap-group12-2">
                            <HeaderMenuDefault className={headerMenuDefault4Props.className}>
                              {headerMenuDefault4Props.children}
                            </HeaderMenuDefault>
                            <img className="arrow-4-8" src={arrow4} alt="Arrow 4" />
                            <img className="arrow-6-10" src={arrow6} alt="Arrow 6" />
                          </div>
                        </div>
                        <div className="frame-13-3">
                          <a href="https://app.diagrams.net/" target="_blank">
                            <div className="modeling-101 valign-text-middle inter-bold-mineral-green-18px">
                              {modeling}
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="overlap-group3-12">
                        <HeaderMenuDefault className={headerMenuDefault5Props.className}>
                          {headerMenuDefault5Props.children}
                        </HeaderMenuDefault>
                        <img className="arrow-2-10" src={arrow2} alt="Arrow 2" />
                      </div>
                      <div className="flex-col-60">
                        <img className="arrow-8-9" src={arrow8} alt="Arrow 8" />
                        <Link to="/kaizen1-1">
                          <div className="frame-2-19">
                            <div className="continue-12 valign-text-middle inter-bold-mineral-green-18px">
                              {xcontinue}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-col-61">
                  <div className="overlap-group18">
                    <input
                      className="output inter-bold-mineral-green-20px"
                      name="output"
                      placeholder={inputPlaceholder6}
                      type={inputType6}
                    />
                  </div>
                  <HeaderMenuDefault className={headerMenuDefault6Props.className}>
                    {headerMenuDefault6Props.children}
                  </HeaderMenuDefault>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kaizen1;
