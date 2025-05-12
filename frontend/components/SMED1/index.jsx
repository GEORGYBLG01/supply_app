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
import Frame1165 from "../Frame1165";
import Frame11742 from "../Frame11742";
import Frame118 from "../Frame118";
import Frame6 from "../Frame6";
import "./SMED1.css";

function SMED1(props) {
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
    label3,
    arrow5,
    label4,
    arrow15,
    arrow12,
    arrow13,
    dernierePieceBonneSerieA,
    changementOutillage,
    reglage,
    inputType1,
    inputPlaceholder1,
    arrow18,
    arrow17,
    arrow16,
    inputType2,
    inputPlaceholder2,
    arrow14,
    arrow11,
    modeling,
    xcontinue,
    frame118Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="smed-1-1 screen">
        <div className="overlap-group1-38">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-58"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-28">
            <div className="nav-items-2-43">
              <Frame11332 />
              <Frame1144 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
            <div className="nav-items-3-71">
              <Frame1135 />
              <Frame1146 />
              <Frame1154 />
              <Frame1165 />
              <Frame11742 />
              <Frame118 className={frame118Props.className}>{frame118Props.children}</Frame118>
            </div>
          </div>
        </div>
        <div className="flex-row-107">
          <div className="flex-col-69 inter-medium-rum-swizzle-18-1px">
            <div className="arrow-container-16">
              <img className="arrow-9-10" src={arrow9} alt="Arrow 9" />
              <img className="arrow-10-5" src={arrow10} alt="Arrow 10" />
            </div>
            <div className="ellipse-85-11"></div>
            <div className="rectangle-9-3"></div>
            <div className="frame-5-16"></div>
            <div className="overlap-group2-16">
              <img className="line-2-15" src={line2} alt="Line 2" />
              <div className="ellipse-86-15"></div>
            </div>
            <div className="label-136">{label1}</div>
            <img className="text-format-16" src={textFormat} alt="Text format" />
            <div className="label-137">{label2}</div>
          </div>
          <div className="flex-row-108">
            <img className="line-1-15" src={line1} alt="Line 1" />
            <div className="flex-col-70">
              <div className="flex-row-109">
                <Link to="/kaizen1-1" className="align-self-flex-end">
                  <div className="frame-11-9">
                    <div className="place-258 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                  </div>
                </Link>
                <p className="click-on-modeling-14 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              </div>
              <div className="overlap-group-container-10">
                <div className="overlap-group3-15">
                  <div className="label-138 inter-medium-cultured-pearl-18-1px">{label3}</div>
                  <img className="arrow-5-10" src={arrow5} alt="Arrow 5" />
                </div>
                <div className="overlap-group4-12">
                  <div className="label-139 inter-medium-cultured-pearl-18-1px">{label4}</div>
                  <img className="arrow-15-1" src={arrow15} alt="Arrow 15" />
                </div>
                <div className="overlap-group-59 inter-medium-dark-fern-18-1px">
                  <div className="rectangle-8"></div>
                  <img className="arrow-12-1" src={arrow12} alt="Arrow 12" />
                  <img className="arrow-13-1" src={arrow13} alt="Arrow 13" />
                  <div className="rectangle-10-1"></div>
                  <p className="derniere-piece-bonne-serie-a">{dernierePieceBonneSerieA}</p>
                  <div className="rectangle-11-1"></div>
                  <div className="changement-outillage">{changementOutillage}</div>
                  <div className="reglage">{reglage}</div>
                  <input
                    className="nettoyage inter-medium-dark-fern-18-1px"
                    name="nettoyage"
                    placeholder={inputPlaceholder1}
                    type={inputType1}
                  />
                  <img className="arrow-18" src={arrow18} alt="Arrow 18" />
                  <img className="arrow-17" src={arrow17} alt="Arrow 17" />
                  <img className="arrow-16-1" src={arrow16} alt="Arrow 16" />
                  <textarea
                    className="premiere-piece-bonne-serie-b inter-medium-dark-fern-18-1px"
                    name="premierepiecebonneserieb"
                    placeholder={inputPlaceholder2}
                    type={inputType2}
                  ></textarea>
                </div>
              </div>
              <div className="flex-row-110">
                <img className="arrow-14-1" src={arrow14} alt="Arrow 14" />
                <div className="overlap-group5-10">
                  <Frame6 />
                  <img className="arrow-11-4" src={arrow11} alt="Arrow 11" />
                </div>
              </div>
              <div className="frame-container-13">
                <div className="frame-12-6">
                  <a href="https://app.diagrams.net/" target="_blank">
                    <div className="modeling-104 valign-text-middle inter-bold-mineral-green-18px">{modeling}</div>
                  </a>
                </div>
                <Link to="/kanban-1">
                  <div className="frame-2-21">
                    <div className="continue-15 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
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

export default SMED1;
