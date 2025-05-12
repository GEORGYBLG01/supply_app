import React from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Toggle from "../Toggle";
import "./ExistingSystems.css";

function ExistingSystems(props) {
  const {
    ellipse116,
    x1200PxLogo_Icam__20081,
    existingSystems,
    graiMethodologyModels,
    x2SupplementaryModels,
    navItems3Props,
    toggle1Props,
    toggle2Props,
    toggle3Props,
    toggle4Props,
    toggle5Props,
    toggle6Props,
    toggle7Props,
    toggle8Props,
    toggle9Props,
    toggle10Props,
    toggle11Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="existing-systems-2 bevan-normal-white-20px screen">
        <img className="ellipse-116-2" src={ellipse116} alt="Ellipse 116" />
        <div className="overlap-group-56">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-55"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-25">
            <NavItems3
              className={navItems3Props.className}
              frame1172Props={navItems3Props.frame1172Props}
              frame1162Props={navItems3Props.frame1162Props}
              frame1132Props={navItems3Props.frame1132Props}
            />
            <NavItems2 />
          </div>
        </div>
        <div className="existing-systems valign-text-middle">{existingSystems}</div>
        <div className="y-models-container">
          <div className="y-models valign-text-middle">{graiMethodologyModels}</div>
          <p className="y-models valign-text-middle">{x2SupplementaryModels}</p>
        </div>
        <div className="group-container">
          <div className="group-81">
            <div className="flex-row-101">
              <div className="toggle-container">
                <Toggle className={toggle1Props.className} buttonSecondaryProps={toggle1Props.buttonSecondaryProps} />
                <Toggle className={toggle2Props.className} buttonSecondaryProps={toggle2Props.buttonSecondaryProps} />
              </div>
              <div className="toggle-container-1">
                <Toggle className={toggle3Props.className} buttonSecondaryProps={toggle3Props.buttonSecondaryProps} />
                <Toggle className={toggle4Props.className} buttonSecondaryProps={toggle4Props.buttonSecondaryProps} />
              </div>
            </div>
            <Toggle className={toggle5Props.className} buttonSecondaryProps={toggle5Props.buttonSecondaryProps} />
          </div>
          <div className="group-82">
            <div className="toggle-container-2">
              <Toggle className={toggle6Props.className} buttonSecondaryProps={toggle6Props.buttonSecondaryProps} />
              <Toggle className={toggle7Props.className} buttonSecondaryProps={toggle7Props.buttonSecondaryProps} />
            </div>
            <div className="toggle-container-3">
              <Toggle className={toggle8Props.className} buttonSecondaryProps={toggle8Props.buttonSecondaryProps} />
              <Toggle className={toggle9Props.className} buttonSecondaryProps={toggle9Props.buttonSecondaryProps} />
            </div>
            <div className="toggle-container-4">
              <Toggle className={toggle10Props.className} buttonSecondaryProps={toggle10Props.buttonSecondaryProps} />
              <Toggle className={toggle11Props.className} buttonSecondaryProps={toggle11Props.buttonSecondaryProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExistingSystems;
