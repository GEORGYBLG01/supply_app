import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import HeaderMenuDefault5 from "../HeaderMenuDefault5";
import HeaderMenuDefault2 from "../HeaderMenuDefault2";
import Frame232 from "../Frame232";
import Frame7 from "../Frame7";
import Pricing3 from "../Pricing3";
import "./MesureDePerformancesFutures.css";

function MesureDePerformancesFutures(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
    label1,
    label2,
    notesAtteintesPourChaqueCritre,
    place,
    inputType1,
    inputPlaceholder1,
    line211,
    leadTime,
    inputType2,
    inputPlaceholder2,
    line212,
    environment,
    inputType3,
    inputPlaceholder3,
    line213,
    xcontinue,
    headerMenuDefault5Props,
    headerMenuDefault21Props,
    headerMenuDefault22Props,
    frame232Props,
    pricing31Props,
    pricing32Props,
    pricing33Props,
    pricing34Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <form className="mesure-de-performances-futures screen" name="form9" action="form9" method="post">
        <div className="flex-col-97">
          <div className="overlap-group-69">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-68"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-container-37">
              <div className="nav-items-2-52">
                <Frame11332 />
                <Frame114 />
                <Frame115 />
                <Frame116 />
                <div className="frame-117-104">
                  <div className="design-84 valign-text-middle inter-medium-sonic-silver-18px">{design}</div>
                </div>
                <Frame11322 />
              </div>
              <div className="nav-items">
                <HeaderMenuDefault5>{headerMenuDefault5Props.children}</HeaderMenuDefault5>
                <HeaderMenuDefault2 className={headerMenuDefault21Props.className}>
                  {headerMenuDefault21Props.children}
                </HeaderMenuDefault2>
                <HeaderMenuDefault2 className={headerMenuDefault22Props.className}>
                  {headerMenuDefault22Props.children}
                </HeaderMenuDefault2>
                <Frame232 headerMenuDefault2Props={frame232Props.headerMenuDefault2Props} />
                <Link to="/functional-view">
                  <div className="label-155 inter-medium-sonic-silver-18-1px">{label1}</div>
                </Link>
                <div className="label-156 inter-medium-gravel-18-1px">{label2}</div>
              </div>
            </div>
          </div>
          <div className="flex-row-137">
            <Frame7 />
            <p className="notes-atteintes-pour-chaque-critre valign-text-middle bevan-normal-white-20px">
              {notesAtteintesPourChaqueCritre}
            </p>
          </div>
          <div className="pricing-container-2">
            <div className="pricing-1-2">
              <h1 className="place-267 inter-bold-mineral-green-24px">{place}</h1>
              <textarea
                className="x25-19 inter-bold-mineral-green-56px"
                name="25"
                placeholder={inputPlaceholder1}
                type={inputType1}
              ></textarea>
              <img className="line-21-8" src={line211} alt="Line 21" />
            </div>
            <Pricing3 cost={pricing31Props.cost} />
            <div className="pricing-2-2">
              <div className="lead-time-3 inter-bold-mineral-green-24px">{leadTime}</div>
              <textarea
                className="x25-20 inter-bold-mineral-green-56px"
                name="25"
                placeholder={inputPlaceholder2}
                type={inputType2}
              ></textarea>
              <img className="line-21-7" src={line212} alt="Line 21" />
            </div>
            <Pricing3 cost={pricing32Props.cost} className={pricing32Props.className} />
          </div>
        </div>
        <div className="flex-row-138">
          <Pricing3 cost={pricing33Props.cost} className={pricing33Props.className} />
          <div className="flex-col-98">
            <div className="pricing-6-2">
              <div className="environment-2 inter-bold-mineral-green-24px">{environment}</div>
              <textarea
                className="x25-21 inter-bold-mineral-green-56px"
                name="25"
                placeholder={inputPlaceholder3}
                type={inputType3}
              ></textarea>
              <img className="line-21-7" src={line213} alt="Line 21" />
            </div>
            <Link to="/mesure-de-performances-futures-1">
              <div className="frame-2-28">
                <div className="continue-21 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
              </div>
            </Link>
          </div>
          <Pricing3 cost={pricing34Props.cost} className={pricing34Props.className} />
        </div>
      </form>
    </div>
  );
}

export default MesureDePerformancesFutures;
