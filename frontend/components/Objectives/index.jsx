import React from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems22 from "../NavItems22";
import Frame52 from "../Frame52";
import Pricing3 from "../Pricing3";
import "./Objectives.css";

function Objectives(props) {
  const {
    x1200PxLogo_Icam__20081,
    place1,
    notesAtteindre,
    place2,
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
    navItems3Props,
    navItems22Props,
    pricing31Props,
    pricing32Props,
    pricing33Props,
    pricing34Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <form className="objectives screen" name="form7" action="form7" method="post">
        <div className="flex-col-34">
          <div className="overlap-group-16">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-16"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-container-5">
              <NavItems3
                className={navItems3Props.className}
                frame1172Props={navItems3Props.frame1172Props}
                frame1162Props={navItems3Props.frame1162Props}
                frame1132Props={navItems3Props.frame1132Props}
              />
              <NavItems22 frame11332Props={navItems22Props.frame11332Props} />
            </div>
          </div>
          <div className="flex-row-50">
            <Frame52 />
            <Link to="/cur-performance" className="align-self-flex-center">
              <div className="frame-6-8">
                <div className="place-77 valign-text-middle inter-bold-tropical-rain-forest-18px">{place1}</div>
              </div>
            </Link>
            <div className="notes-atteindre valign-text-middle bevan-normal-white-20px">{notesAtteindre}</div>
          </div>
          <div className="pricing-container">
            <div className="pricing-1">
              <h1 className="place-78 inter-bold-mineral-green-24px">{place2}</h1>
              <textarea
                className="x25-1 inter-bold-mineral-green-56px"
                name="25"
                placeholder={inputPlaceholder1}
                type={inputType1}
              ></textarea>
              <img className="line-21-1" src={line211} alt="Line 21" />
            </div>
            <Pricing3 cost={pricing31Props.cost} />
            <div className="pricing-2">
              <div className="lead-time inter-bold-mineral-green-24px">{leadTime}</div>
              <textarea
                className="x25-2 inter-bold-mineral-green-56px"
                name="25"
                placeholder={inputPlaceholder2}
                type={inputType2}
              ></textarea>
              <img className="line-21" src={line212} alt="Line 21" />
            </div>
            <Pricing3 cost={pricing32Props.cost} className={pricing32Props.className} />
          </div>
        </div>
        <div className="flex-row-51">
          <Pricing3 cost={pricing33Props.cost} className={pricing33Props.className} />
          <div className="flex-col-35">
            <div className="pricing-6">
              <div className="environment inter-bold-mineral-green-24px">{environment}</div>
              <textarea
                className="x25-3 inter-bold-mineral-green-56px"
                name="25"
                placeholder={inputPlaceholder3}
                type={inputType3}
              ></textarea>
              <img className="line-21" src={line213} alt="Line 21" />
            </div>
            <a href="javascript:SubmitForm('form7')">
              <div className="frame-2-13">
                <div className="continue-8 valign-text-middle inter-bold-mineral-green-18px">{xcontinue}</div>
              </div>
            </a>
          </div>
          <Pricing3 cost={pricing34Props.cost} className={pricing34Props.className} />
        </div>
      </form>
    </div>
  );
}

export default Objectives;
