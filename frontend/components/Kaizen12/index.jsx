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
import Frame8 from "../Frame8";
import Frame82 from "../Frame82";
import Frame9 from "../Frame9";
import "./Kaizen12.css";

function Kaizen12(props) {
  const {
    x1200PxLogo_Icam__20081,
    label1,
    leanVsm,
    label2,
    overlapGroup8,
    arrow9,
    overlapGroup5,
    arrow10,
    line4,
    line2,
    label3,
    label4,
    overlapGroup9,
    textFormat,
    label5,
    label6,
    overlapGroup4,
    line1,
    place,
    x1IdentificatonDuProblemeATraiter,
    x2EtudeDeLaSituation,
    arrow6,
    x6AuditDesContreMesures,
    arrow16,
    arrow13,
    arrow14,
    arrow15,
    arrow17,
    x7StandardisationDesBonnesMesures,
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
      <div className="kaizen1 screen">
        <div className="flex-col-78">
          <div className="overlap-group1-40">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-60"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-container-30">
              <div className="nav-items-2-47">
                <Frame11332 className={frame11332Props.className} />
                <Frame114 />
                <Frame115 />
                <Frame116 />
                <Link to="/functional-view">
                  <div className="label-143 inter-medium-sonic-silver-18-1px">{label1}</div>
                </Link>
                <Frame11322 className={frame11322Props.className} />
              </div>
              <div className="nav-items-3-73">
                <Link to="/lean-vsm">
                  <div className="frame-113-62">
                    <div className="lean-vsm-11 valign-text-middle inter-medium-star-dust-18px">{leanVsm}</div>
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
          <div className="label-144 inter-medium-cultured-pearl-20px">{label2}</div>
        </div>
        <div className="flex-row-117">
          <div className="flex-col-79 inter-medium-rum-swizzle-18-1px">
            <div className="overlap-group-container-11">
              <div className="overlap-group8-1" style={{ backgroundImage: `url(${overlapGroup8})` }}>
                <img className="arrow-9-12" src={arrow9} alt="Arrow 9" />
              </div>
              <div className="overlap-group5-12" style={{ backgroundImage: `url(${overlapGroup5})` }}>
                <img className="arrow-10-6" src={arrow10} alt="Arrow 10" />
              </div>
            </div>
            <div className="ellipse-container">
              <div className="ellipse-87-4"></div>
              <div className="ellipse-85-12"></div>
            </div>
            <div className="rectangle-10-2"></div>
            <div className="overlap-group11-1">
              <div className="frame-5-18"></div>
            </div>
            <div className="overlap-group3-17">
              <img className="line-5" src={line4} alt="Line 4" />
              <div className="ellipse-8-1"></div>
              <img className="line-5" src={line2} alt="Line 2" />
              <div className="ellipse-8-1"></div>
            </div>
            <div className="label-container-2">
              <div className="label-142">{label3}</div>
              <div className="label-142">{label4}</div>
            </div>
            <div className="overlap-group9-1" style={{ backgroundImage: `url(${overlapGroup9})` }}>
              <img className="text-format-18" src={textFormat} alt="Text format" />
            </div>
            <div className="label-container-3">
              <div className="label-142">{label5}</div>
              <div className="label-142">{label6}</div>
            </div>
          </div>
          <div className="flex-row-118">
            <div className="flex-row-119">
              <div className="overlap-group4-14" style={{ backgroundImage: `url(${overlapGroup4})` }}>
                <img className="line-1-16" src={line1} alt="Line 1" />
              </div>
              <Link to="/kaizen">
                <div className="frame-8-6">
                  <div className="place-260 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                </div>
              </Link>
            </div>
            <div className="flex-col-80">
              <div className="overlap-group12-3 inter-medium-dark-fern-18-1px">
                <div className="frame-7-4">
                  <p className="x1-identificaton-du-probleme-a-traiter inter-medium-dark-fern-18-1px">
                    {x1IdentificatonDuProblemeATraiter}
                  </p>
                </div>
                <div className="overlap-group10">
                  <div className="frame-8-7">
                    <p className="x2-etude-de-la-situation">{x2EtudeDeLaSituation}</p>
                  </div>
                  <img className="arrow-6-13" src={arrow6} alt="Arrow 6" />
                </div>
                <div className="overlap-group-61">
                  <div className="frame-10-5">
                    <div className="x6-audit-des-contre-mesures">{x6AuditDesContreMesures}</div>
                  </div>
                  <Frame8>{frame8Props.children}</Frame8>
                  <Frame82>{frame82Props.children}</Frame82>
                  <Frame9>{frame9Props.children}</Frame9>
                  <img className="arrow-16-2" src={arrow16} alt="Arrow 16" />
                  <img className="arrow-13-3" src={arrow13} alt="Arrow 13" />
                  <img className="arrow-14-2" src={arrow14} alt="Arrow 14" />
                  <img className="arrow-15-2" src={arrow15} alt="Arrow 15" />
                </div>
              </div>
              <img className="arrow-17-1" src={arrow17} alt="Arrow 17" />
              <div className="frame-container-14">
                <div className="frame-8-8">
                  <div className="x7-standardisation-des-bonnes-mesures inter-medium-dark-fern-18-1px">
                    {x7StandardisationDesBonnesMesures}
                  </div>
                </div>
                <div className="frame-10-6">
                  <a href="https://app.diagrams.net/" target="_blank">
                    <div className="modeling-106 valign-text-middle inter-bold-tropical-rain-forest-18px">
                      {modeling}
                    </div>
                  </a>
                </div>
                <Link to="/smed">
                  <div className="frame-2-23">
                    <div className="continue-17 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
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

export default Kaizen12;
