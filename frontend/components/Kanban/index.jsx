import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import Frame1146 from "../Frame1146";
import Frame1154 from "../Frame1154";
import Frame1164 from "../Frame1164";
import Frame1175 from "../Frame1175";
import Frame118 from "../Frame118";
import "./Kanban.css";

function Kanban(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
    leanVsm,
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
    urgence,
    aFaire,
    termine,
    enAttente,
    enCours,
    line3,
    modeling,
    xcontinue,
    frame118Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="kanban-14 screen">
        <div className="overlap-group2-22">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-65"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-35">
            <div className="nav-items-2-51">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-102">
                <div className="design-83 valign-text-middle inter-medium-sonic-silver-18px">{design}</div>
              </div>
              <Frame11322 />
            </div>
            <div className="nav-items-3-77">
              <Link to="/lean-vsm">
                <div className="frame-113-66">
                  <div className="lean-vsm-15 valign-text-middle inter-medium-star-dust-18px">{leanVsm}</div>
                </div>
              </Link>
              <Frame1146 />
              <Frame1154 />
              <Frame1164 />
              <Frame1175 />
              <Frame118 className={frame118Props.className}>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-134">
          <div className="flex-col-94">
            <div className="flex-col-95">
              <div className="arrow-container-22">
                <img className="arrow-9-14" src={arrow9} alt="Arrow 9" />
                <img className="arrow-10-8" src={arrow10} alt="Arrow 10" />
              </div>
              <div className="ellipse-85-14"></div>
              <div className="rectangle-9-5"></div>
              <div className="frame-5-22"></div>
            </div>
            <div className="flex-row-135">
              <div className="flex-col-93">
                <img className="rectangle-23-4" src={rectangle23} alt="Rectangle 23" />
                <div className="rectangle-25-1"></div>
              </div>
              <div className="flex-col-93">
                <div className="rectangle-24-4"></div>
                <div className="rectangle-26-1"></div>
              </div>
            </div>
            <div className="group-container-2">
              <div className="group-84-1">
                <div className="overlap-group-66">
                  <img className="line-2-20" src={line2} alt="Line 2" />
                  <div className="ellipse-86-23"></div>
                </div>
                <div className="label-153 inter-medium-rum-swizzle-18-1px">{label1}</div>
              </div>
              <div className="group-83-1">
                <img className="text-format-22" src={textFormat} alt="Text format" />
                <div className="label-154 inter-medium-rum-swizzle-18-1px">{label2}</div>
              </div>
            </div>
          </div>
          <div className="flex-row-136">
            <img className="line-22-1" src={line22} alt="Line 22" />
            <Link to="/smed">
              <div className="frame-7-8">
                <div className="place-265 valign-text-middle inter-bold-tropical-rain-forest-18px">{place1}</div>
              </div>
            </Link>
            <div className="flex-col-96">
              <p className="click-on-modeling-19 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              <div className="overlap-group3-21">
                <h1 className="place-266 valign-text-middle inter-bold-mineral-green-24px">{place2}</h1>
                <div className="overlap-group1-44">
                  <div className="rectangle-10-4"></div>
                  <div className="rectangle-13-1"></div>
                  <div className="rectangle-12-1"></div>
                  <div className="rectangle-11-3"></div>
                  <img className="arrow-11-7" src={arrow11} alt="Arrow 11" />
                  <img className="line-4-5" src={line4} alt="Line 4" />
                  <div className="urgence-1 inter-medium-dark-fern-15px">{urgence}</div>
                  <div className="rectangle-17-1"></div>
                  <div className="rectangle-16-1"></div>
                  <div className="rectangle-14-1"></div>
                  <div className="rectangle-15-1"></div>
                  <div className="rectangle-18-1"></div>
                  <div className="rectangle-19-1"></div>
                  <div className="rectangle-21-1"></div>
                </div>
                <div className="a-faire inter-medium-dark-fern-18-1px">{aFaire}</div>
                <div className="termine inter-medium-dark-fern-18-1px">{termine}</div>
                <div className="en-attente inter-medium-dark-fern-18-1px">{enAttente}</div>
                <div className="en-cours inter-medium-dark-fern-18-1px">{enCours}</div>
                <img className="line-3-7" src={line3} alt="Line 3" />
              </div>
              <div className="frame-container-16">
                <div className="frame-8-17">
                  <a href="https://app.diagrams.net/" target="_blank">
                    <div className="modeling-110 valign-text-middle inter-bold-tropical-rain-forest-18px">
                      {modeling}
                    </div>
                  </a>
                </div>
                <Link to="/visual-management">
                  <div className="frame-2-27">
                    <div className="continue-20 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
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

export default Kanban;
