import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import Frame1146 from "../Frame1146";
import Frame1154 from "../Frame1154";
import Frame1165 from "../Frame1165";
import Frame11742 from "../Frame11742";
import Frame118 from "../Frame118";
import Frame6 from "../Frame6";
import "./SMED.css";

function SMED(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
    leanVsm,
    arrow121,
    arrow131,
    line2,
    label1,
    textFormat,
    label2,
    line23,
    place,
    clickOnModeling,
    label3,
    arrow5,
    label4,
    arrow15,
    arrow122,
    arrow132,
    dernierePieceBonneSerieA,
    changementOutillage,
    reglage,
    nettoyage,
    arrow18,
    arrow17,
    arrow16,
    premierePieceBonneSerieB,
    arrow14,
    modeling,
    arrow11,
    xcontinue,
    frame118Props,
    frame6Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="smed-15 screen">
        <div className="overlap-group2-19">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-63"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-33">
            <div className="nav-items-2-49">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-100">
                <div className="design-81 valign-text-middle inter-medium-sonic-silver-18px">{design}</div>
              </div>
              <Frame11322 />
            </div>
            <div className="nav-items-3-75">
              <Link to="/lean-vsm">
                <div className="frame-113-64">
                  <div className="lean-vsm-13 valign-text-middle inter-medium-star-dust-18px">{leanVsm}</div>
                </div>
              </Link>
              <Frame1146 />
              <Frame1154 />
              <Frame1165 />
              <Frame11742 />
              <Frame118 className={frame118Props.className}>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-127">
          <div className="flex-col-87">
            <div className="arrow-container-20">
              <img className="arrow-12-4" src={arrow121} alt="Arrow 12" />
              <img className="arrow-13-5" src={arrow131} alt="Arrow 13" />
            </div>
            <div className="ellipse-86-20"></div>
            <div className="rectangle-23-3"></div>
            <div className="frame-8-14"></div>
            <div className="rectangle-24-3"></div>
            <div className="group-86-2">
              <div className="overlap-group-64">
                <img className="line-2-18" src={line2} alt="Line 2" />
                <div className="ellipse-86-21"></div>
              </div>
              <div className="label-147 inter-medium-rum-swizzle-18-1px">{label1}</div>
            </div>
            <div className="group-85-2">
              <img className="text-format-20" src={textFormat} alt="Text format" />
              <div className="label-148 inter-medium-rum-swizzle-18-1px">{label2}</div>
            </div>
          </div>
          <div className="flex-row-128">
            <div className="flex-row-129">
              <img className="line-23-2" src={line23} alt="Line 23" />
              <Link to="/kaizen1">
                <div className="frame-7-6">
                  <div className="place-263 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                </div>
              </Link>
            </div>
            <div className="flex-col-88">
              <p className="click-on-modeling-17 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              <div className="overlap-group-container-14 inter-medium-cultured-pearl-18-1px">
                <div className="overlap-group4-16">
                  <div className="label-149">{label3}</div>
                  <img className="arrow-5-13" src={arrow5} alt="Arrow 5" />
                </div>
                <div className="overlap-group3-19">
                  <div className="label-150">{label4}</div>
                  <img className="arrow-15-3" src={arrow15} alt="Arrow 15" />
                </div>
                <div className="overlap-group1-42 inter-medium-dark-fern-18-1px">
                  <div className="rectangle-8-1"></div>
                  <img className="arrow-12-5" src={arrow122} alt="Arrow 12" />
                  <img className="arrow-13-6" src={arrow132} alt="Arrow 13" />
                  <div className="rectangle-10-3"></div>
                  <p className="derniere-piece-bonne-serie-a-1">{dernierePieceBonneSerieA}</p>
                  <div className="rectangle-11-2"></div>
                  <div className="changement-outillage-1">{changementOutillage}</div>
                  <div className="reglage-1">{reglage}</div>
                  <div className="nettoyage-1">{nettoyage}</div>
                  <img className="arrow-18-1" src={arrow18} alt="Arrow 18" />
                  <img className="arrow-17-2" src={arrow17} alt="Arrow 17" />
                  <img className="arrow-16-3" src={arrow16} alt="Arrow 16" />
                  <p className="premiere-piece-bonne-serie-b-1">{premierePieceBonneSerieB}</p>
                </div>
              </div>
              <div className="flex-row-130">
                <div className="flex-col-89">
                  <img className="arrow-14-3" src={arrow14} alt="Arrow 14" />
                  <div className="frame-5-20">
                    <a href="https://app.diagrams.net/" target="_blank">
                      <div className="modeling-108 valign-text-middle inter-bold-tropical-rain-forest-18px">
                        {modeling}
                      </div>
                    </a>
                  </div>
                </div>
                <Frame6 className={frame6Props.className} />
                <div className="flex-col-90">
                  <img className="arrow-11-5" src={arrow11} alt="Arrow 11" />
                  <Link to="/kanban" className="align-self-flex-end">
                    <div className="frame-2-25">
                      <div className="continue-19 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
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

export default SMED;
