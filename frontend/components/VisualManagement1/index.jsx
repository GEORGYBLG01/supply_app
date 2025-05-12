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
import Frame1154 from "../Frame1154";
import Frame1164 from "../Frame1164";
import Frame11742 from "../Frame11742";
import Frame1136 from "../Frame1136";
import Toggle from "../Toggle";
import "./VisualManagement1.css";
import { useHistory } from "react-router-dom";

function VisualManagement1(props) {
  const history = useHistory();
  const {
    x1200PxLogo_Icam__20081,
    arrow9,
    arrow10,
    line2,
    label1,
    textFormat,
    label2,
    line1,
    place,
    clickOnModeling,
    inputType1,
    inputPlaceholder1,
    inputType2,
    inputPlaceholder2,
    inputType3,
    inputPlaceholder3,
    inputType4,
    inputPlaceholder4,
    inputType5,
    inputPlaceholder5,
    arrow11,
    arrow16,
    arrow13,
    arrow14,
    inputType6,
    inputPlaceholder6,
    arrow12,
    arrow15,
    inputType7,
    inputPlaceholder7,
    modeling,
    frame1136Props,
    toggleProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="visual-management-1-1 screen">
        <div className="overlap-group2-8">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-14"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-4">
            <div className="nav-items-2-18">
              <Frame11332 />
              <Frame1144 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
            <div className="nav-items-3-65">
              <Frame1135 />
              <Frame1146 />
              <Frame1154 />
              <Frame1164 />
              <Frame11742 />
              <Frame1136 className={frame1136Props.className}>
                {frame1136Props.children}
              </Frame1136>
            </div>
          </div>
        </div>
        <div className="flex-row-42">
          <div className="flex-col-28 inter-medium-rum-swizzle-18-1px">
            <div className="arrow-container-9">
              <img className="arrow-9-4" src={arrow9} alt="Arrow 9" />
              <img className="arrow-10-1" src={arrow10} alt="Arrow 10" />
            </div>
            <div className="ellipse-85-4"></div>
            <div className="rectangle-9"></div>
            <div className="frame-5-10"></div>
            <div className="overlap-group1-26">
              <img className="line-2-8" src={line2} alt="Line 2" />
              <div className="ellipse-86-8"></div>
            </div>
            <div className="label-101">{label1}</div>
            <img className="text-format-8" src={textFormat} alt="Text format" />
            <div className="label-102">{label2}</div>
          </div>
          <img className="line-1-8" src={line1} alt="Line 1" />
          <div className="flex-col-29">
            <div className="flex-row-43">
              <Link to="/kanban-1">
                <div className="frame-11-8">
                  <div className="place-75 valign-text-middle inter-bold-tropical-rain-forest-18px">
                    {place}
                  </div>
                </div>
              </Link>
              <p className="click-on-modeling-7 valign-text-middle bevan-normal-white-20px">
                {clickOnModeling}
              </p>
            </div>
            <div className="overlap-group3-8">
              <div className="overlap-group1-27">
                <div className="frame-6-5">
                  <textarea
                    className="knowledge-skills inter-medium-dark-fern-18-1px"
                    name="knowledgeskills"
                    placeholder={inputPlaceholder1}
                    type={inputType1}
                  ></textarea>
                </div>
                <div className="frame-7-2">
                  <textarea
                    className="collaborators-teams inter-medium-dark-fern-18-1px"
                    name="collaboratorsteams"
                    placeholder={inputPlaceholder2}
                    type={inputType2}
                  ></textarea>
                </div>
                <div className="frame-10-2">
                  <textarea
                    className="strategies-projects inter-medium-dark-fern-18-1px"
                    name="strategiesprojects"
                    placeholder={inputPlaceholder3}
                    type={inputType3}
                  ></textarea>
                </div>
                <div className="frame-8-2">
                  <textarea
                    className="ideas-information inter-medium-dark-fern-18-1px"
                    name="ideasinformation"
                    placeholder={inputPlaceholder4}
                    type={inputType4}
                  ></textarea>
                </div>
                <div className="overlap-group-14">
                  <div className="frame-6-6">
                    <textarea
                      className="time-priorities inter-medium-dark-fern-18-1px"
                      name="timepriorities"
                      placeholder={inputPlaceholder5}
                      type={inputType5}
                    ></textarea>
                  </div>
                  <img className="arrow-11-1" src={arrow11} alt="Arrow 11" />
                  <img className="arrow-16" src={arrow16} alt="Arrow 16" />
                  <img className="arrow-13" src={arrow13} alt="Arrow 13" />
                  <img className="arrow-14" src={arrow14} alt="Arrow 14" />
                  <div className="ellipse-87-1"></div>
                  <textarea
                    className="better-management inter-medium-dark-fern-18-1px"
                    name="bettermanagement"
                    placeholder={inputPlaceholder6}
                    type={inputType6}
                  ></textarea>
                </div>
                <img className="arrow-12" src={arrow12} alt="Arrow 12" />
                <img className="arrow-15" src={arrow15} alt="Arrow 15" />
              </div>
              <div className="frame-9-1">
                <textarea
                  className="problems-decision inter-medium-dark-fern-18-1px"
                  name="problemsdecision"
                  placeholder={inputPlaceholder7}
                  type={inputType7}
                ></textarea>
              </div>
            </div>
            <div className="flex-row-44">
              <Link to="/existing-case">
                <div className="frame-12-4">
                  <a href="https://app.diagrams.net/" target="_blank">
                    <div className="modeling-97 valign-text-middle inter-bold-tropical-rain-forest-18px">
                      {modeling}
                    </div>
                  </a>
                </div>
              </Link>
              <Link to="/analysis">
                <Toggle
                  className={toggleProps.className}
                  buttonSecondaryProps={toggleProps.buttonSecondaryProps}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualManagement1;
