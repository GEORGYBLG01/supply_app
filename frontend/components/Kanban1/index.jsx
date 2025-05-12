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
import Frame1175 from "../Frame1175";
import Frame118 from "../Frame118";
import "./Kanban1.css";

function Kanban1(props) {
  const {
    x1200PxLogo_Icam__20081,
    arrow9,
    arrow10,
    rectangle23,
    line2,
    label1,
    textFormat,
    label2,
    line22,
    place1,
    clickOnModeling,
    place2,
    arrow11,
    line4,
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
    line3,
    modeling,
    xcontinue,
    frame1135Props,
    frame118Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="kanban-1-1 screen">
        <div className="overlap-group2-14">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-56"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-26">
            <div className="nav-items-2-37">
              <Frame11332 />
              <Frame1144 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
            <div className="nav-items-3-69">
              <Frame1135 className={frame1135Props.className} />
              <Frame1146 />
              <Frame1154 />
              <Frame1164 />
              <Frame1175 />
              <Frame118>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-102">
          <div className="flex-col-63">
            <div className="flex-col-64">
              <div className="arrow-container-14">
                <img className="arrow-9-9" src={arrow9} alt="Arrow 9" />
                <img className="arrow-10-4" src={arrow10} alt="Arrow 10" />
              </div>
              <div className="ellipse-85-10"></div>
              <div className="rectangle-9-2"></div>
              <div className="frame-5-15"></div>
            </div>
            <div className="flex-row-103">
              <div className="flex-col-62">
                <img className="rectangle-23" src={rectangle23} alt="Rectangle 23" />
                <div className="rectangle-25"></div>
              </div>
              <div className="flex-col-62">
                <div className="rectangle-24"></div>
                <div className="rectangle-26"></div>
              </div>
            </div>
            <div className="group-container-1">
              <div className="group-84">
                <div className="overlap-group-57">
                  <img className="line-2-13" src={line2} alt="Line 2" />
                  <div className="ellipse-86-13"></div>
                </div>
                <div className="label-131 inter-medium-rum-swizzle-18-1px">{label1}</div>
              </div>
              <div className="group-83">
                <img className="text-format-14" src={textFormat} alt="Text format" />
                <div className="label-132 inter-medium-rum-swizzle-18-1px">{label2}</div>
              </div>
            </div>
          </div>
          <div className="flex-row-104">
            <img className="line-22" src={line22} alt="Line 22" />
            <Link to="/smed-1">
              <div className="frame-12-5">
                <div className="place-254 valign-text-middle inter-bold-tropical-rain-forest-18px">{place1}</div>
              </div>
            </Link>
            <div className="flex-col-65">
              <p className="click-on-modeling-12 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              <div className="overlap-group3-13">
                <h1 className="place-256 valign-text-middle inter-bold-mineral-green-24px">{place2}</h1>
                <div className="overlap-group1-36">
                  <div className="rectangle-10"></div>
                  <div className="rectangle-13"></div>
                  <div className="rectangle-12"></div>
                  <div className="rectangle-11"></div>
                  <img className="arrow-11-3" src={arrow11} alt="Arrow 11" />
                  <img className="line-4-4" src={line4} alt="Line 4" />
                  <input
                    className="urgence inter-medium-dark-fern-15px"
                    name="urgence"
                    placeholder={inputPlaceholder1}
                    type={inputType1}
                  />
                  <div className="rectangle-17"></div>
                  <div className="rectangle-16"></div>
                  <div className="rectangle-14"></div>
                  <div className="rectangle-15"></div>
                  <div className="rectangle-18"></div>
                  <div className="rectangle-19"></div>
                  <div className="rectangle-21"></div>
                </div>
                <input
                  className="to-do inter-medium-dark-fern-18-1px"
                  name="todo"
                  placeholder={inputPlaceholder2}
                  type={inputType2}
                />
                <input
                  className="completed inter-medium-dark-fern-18-1px"
                  name="completed"
                  placeholder={inputPlaceholder3}
                  type={inputType3}
                />
                <input
                  className="pending inter-medium-dark-fern-18-1px"
                  name="pending"
                  placeholder={inputPlaceholder4}
                  type={inputType4}
                />
                <input
                  className="in-progress inter-medium-dark-fern-18-1px"
                  name="inprogress"
                  placeholder={inputPlaceholder5}
                  type={inputType5}
                />
                <img className="line-3-6" src={line3} alt="Line 3" />
              </div>
              <div className="frame-container-12">
                <Link to="/existing-case">
                  <div className="frame-15">
                    <a href="https://app.diagrams.net/" target="_blank">
                      <div className="modeling-102 valign-text-middle inter-bold-tropical-rain-forest-18px">
                        {modeling}
                      </div>
                    </a>
                  </div>
                </Link>
                <Link to="/visual-management-1">
                  <div className="frame-15">
                    <div className="continue-13 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
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

export default Kanban1;
