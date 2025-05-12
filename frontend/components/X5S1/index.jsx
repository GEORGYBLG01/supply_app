import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame1144 from "../Frame1144";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import Frame11322 from "../Frame11322";
import Frame1135 from "../Frame1135";
import Frame1147 from "../Frame1147";
import Frame1154 from "../Frame1154";
import Frame1164 from "../Frame1164";
import Frame11742 from "../Frame11742";
import Frame118 from "../Frame118";
import "./X5S1.css";

function X5S1(props) {
  const {
    x1200PxLogo_Icam__20081,
    arrow1,
    arrow2,
    rectangle6,
    line2,
    label1,
    textFormat,
    label2,
    line1,
    place,
    clickOnModeling,
    seiri,
    arrow7,
    inputType1,
    inputPlaceholder1,
    arrow3,
    seiton,
    arrow8,
    inputType2,
    inputPlaceholder2,
    modeling,
    arrow4,
    seison,
    arrow9,
    inputType3,
    inputPlaceholder3,
    arrow6,
    seiketsu,
    shitsuke,
    arrow10,
    arrow11,
    arrow5,
    rectangle7,
    inputType4,
    inputPlaceholder4,
    inputType5,
    inputPlaceholder5,
    xcontinue,
    frame118Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="x5s-1 screen">
        <div className="overlap-group4-6">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-12"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-3">
            <div className="nav-items-2-16">
              <Frame11332 />
              <Frame1144 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
            <div className="nav-items-3-64">
              <Frame1135 />
              <Frame1147 />
              <Frame1154 />
              <Frame1164 />
              <Frame11742 />
              <Frame118 className={frame118Props.className}>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-37">
          <div className="flex-col-22 inter-medium-rum-swizzle-18-1px">
            <div className="arrow-container-7">
              <img className="arrow-1-7" src={arrow1} alt="Arrow 1" />
              <img className="arrow-2-6" src={arrow2} alt="Arrow 2" />
            </div>
            <div className="ellipse-88-1"></div>
            <div className="rectangle-3-4"></div>
            <img className="rectangle-6-2" src={rectangle6} alt="Rectangle 6" />
            <div className="overlap-group-12">
              <img className="line-2-7" src={line2} alt="Line 2" />
              <div className="ellipse-86-7"></div>
            </div>
            <div className="label-96">{label1}</div>
            <img className="text-format-7" src={textFormat} alt="Text format" />
            <div className="label-97">{label2}</div>
          </div>
          <div className="flex-row-38">
            <img className="line-1-7" src={line1} alt="Line 1" />
            <div className="flex-col-23">
              <div className="flex-row-39">
                <Link to="/lean-vsm-1">
                  <div className="frame-11-7">
                    <div className="place-73 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                  </div>
                </Link>
                <p className="click-on-modeling-6 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              </div>
              <div className="flex-row-40">
                <div className="flex-col-24">
                  <div className="seiri inter-medium-white-18-1px">{seiri}</div>
                  <img className="arrow-7-4" src={arrow7} alt="Arrow 7" />
                  <div className="overlap-group2-7">
                    <div className="ellipse-87"></div>
                    <div className="ellipse-89"></div>
                    <input
                      className="disposal inter-medium-dark-fern-18-1px"
                      name="disposal"
                      placeholder={inputPlaceholder1}
                      type={inputType1}
                    />
                  </div>
                </div>
                <img className="arrow-3-4" src={arrow3} alt="Arrow 3" />
                <div className="flex-col-25">
                  <div className="seiton inter-medium-white-18-1px">{seiton}</div>
                  <img className="arrow-8-5" src={arrow8} alt="Arrow 8" />
                  <div className="overlap-group5-4">
                    <input
                      className="put-away inter-medium-dark-fern-18-1px"
                      name="putaway"
                      placeholder={inputPlaceholder2}
                      type={inputType2}
                    />
                  </div>
                  <div className="frame-12-3">
                    <a href="https://app.diagrams.net/" target="_blank">
                      <div className="modeling-96 valign-text-middle inter-bold-mineral-green-18px">{modeling}</div>
                    </a>
                  </div>
                </div>
                <img className="arrow-4-4" src={arrow4} alt="Arrow 4" />
                <div className="flex-col-26">
                  <div className="seison inter-medium-white-18-1px">{seison}</div>
                  <img className="arrow-9-3" src={arrow9} alt="Arrow 9" />
                  <div className="overlap-group3-7">
                    <input
                      className="c-lean inter-medium-dark-fern-18-1px"
                      name="clean"
                      placeholder={inputPlaceholder3}
                      type={inputType3}
                    />
                  </div>
                </div>
                <img className="arrow-6-6" src={arrow6} alt="Arrow 6" />
                <div className="flex-col-27">
                  <div className="flex-row-41 inter-medium-white-18-1px">
                    <div className="seiketsu">{seiketsu}</div>
                    <div className="shitsuke">{shitsuke}</div>
                  </div>
                  <div className="arrow-container-8">
                    <img className="arrow-1-6" src={arrow10} alt="Arrow 10" />
                    <img className="arrow-1-6" src={arrow11} alt="Arrow 11" />
                  </div>
                  <div className="overlap-group1-25">
                    <div className="rectangle-5-2"></div>
                    <img className="arrow-5-5" src={arrow5} alt="Arrow 5" />
                    <img className="rectangle-7-2" src={rectangle7} alt="Rectangle 7" />
                    <input
                      className="standardize inter-medium-dark-fern-18-1px"
                      name="standardize"
                      placeholder={inputPlaceholder4}
                      type={inputType4}
                    />
                    <input
                      className="respect inter-medium-dark-fern-18-1px"
                      name="respect"
                      placeholder={inputPlaceholder5}
                      type={inputType5}
                    />
                  </div>
                  <Link to="/kaizen-1" className="align-self-flex-start">
                    <div className="frame-2-6">
                      <div className="continue-5 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default X5S1;
