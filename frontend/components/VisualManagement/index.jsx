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
import Frame11742 from "../Frame11742";
import Frame1136 from "../Frame1136";
import "./VisualManagement.css";

function VisualManagement(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
    leanVsm,
    arrow9,
    arrow10,
    line2,
    label1,
    textFormat,
    label2,
    line1,
    place,
    clickOnModeling,
    connaissancesCompetences,
    collaborateursEquipes,
    strategiesProjets,
    ideesInformations,
    tempsPriorites,
    arrow11,
    arrow16,
    arrow13,
    arrow14,
    mieuxManager,
    arrow12,
    arrow15,
    problemesDecision,
    modeling,
    analyzeTheFuturPerformances,
    frame1136Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="visual-management-15 screen">
        <div className="overlap-group1-43">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-64"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-34">
            <div className="nav-items-2-50">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-101">
                <div className="design-82 valign-text-middle inter-medium-sonic-silver-18px">{design}</div>
              </div>
              <Frame11322 />
            </div>
            <div className="nav-items-3-76">
              <Link to="/lean-vsm">
                <div className="frame-113-65">
                  <div className="lean-vsm-14 valign-text-middle inter-medium-star-dust-18px">{leanVsm}</div>
                </div>
              </Link>
              <Frame1146 />
              <Frame1154 />
              <Frame1164 />
              <Frame11742 />
              <Frame1136 className={frame1136Props.className}>{frame1136Props.children}</Frame1136>
            </div>
          </div>
        </div>
        <div className="flex-row-131">
          <div className="flex-row-132">
            <div className="flex-col-91 inter-medium-rum-swizzle-18-1px">
              <div className="arrow-container-21">
                <img className="arrow-9-13" src={arrow9} alt="Arrow 9" />
                <img className="arrow-10-7" src={arrow10} alt="Arrow 10" />
              </div>
              <div className="ellipse-85-13"></div>
              <div className="rectangle-9-4"></div>
              <div className="frame-5-21"></div>
              <div className="overlap-group2-20">
                <img className="line-2-19" src={line2} alt="Line 2" />
                <div className="ellipse-86-22"></div>
              </div>
              <div className="label-151">{label1}</div>
              <img className="text-format-21" src={textFormat} alt="Text format" />
              <div className="label-152">{label2}</div>
            </div>
            <div className="flex-row-133">
              <img className="line-1-17" src={line1} alt="Line 1" />
              <Link to="/kanban">
                <div className="frame-11-10">
                  <div className="place-264 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex-col-92">
            <p className="click-on-modeling-18 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
            <div className="overlap-group3-20 inter-medium-dark-fern-18-1px">
              <div className="overlap-group2-21">
                <div className="frame-6-12">
                  <div className="connaissances-competences">{connaissancesCompetences}</div>
                </div>
                <div className="frame-7-7">
                  <div className="collaborateurs-equipes">{collaborateursEquipes}</div>
                </div>
                <div className="frame-10-7">
                  <div className="strategies-projets">{strategiesProjets}</div>
                </div>
                <div className="frame-8-15">
                  <div className="idees-informations">{ideesInformations}</div>
                </div>
                <div className="overlap-group-65">
                  <div className="frame-6-13">
                    <div className="temps-priorites">{tempsPriorites}</div>
                  </div>
                  <img className="arrow-11-6" src={arrow11} alt="Arrow 11" />
                  <img className="arrow-16-4" src={arrow16} alt="Arrow 16" />
                  <img className="arrow-13-7" src={arrow13} alt="Arrow 13" />
                  <img className="arrow-14-4" src={arrow14} alt="Arrow 14" />
                  <div className="ellipse-87-5"></div>
                  <p className="mieux-manager">{mieuxManager}</p>
                </div>
                <img className="arrow-12-6" src={arrow12} alt="Arrow 12" />
                <img className="arrow-15-4" src={arrow15} alt="Arrow 15" />
              </div>
              <div className="frame-9-8">
                <div className="problemes-decision">{problemesDecision}</div>
              </div>
            </div>
            <div className="frame-container-15">
              <div className="frame-8-16">
                <a href="https://app.diagrams.net/" target="_blank">
                  <div className="modeling-109 valign-text-middle inter-bold-tropical-rain-forest-18px">{modeling}</div>
                </a>
              </div>
              <Link to="/environmental-1">
                <div className="frame-2-26">
                  <div className="analyze-the-futur-performances valign-text-middle inter-bold-tropical-rain-forest-18px">
                    {analyzeTheFuturPerformances}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualManagement;
