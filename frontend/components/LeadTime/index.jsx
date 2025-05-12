import React from "react";
import { Link } from "react-router-dom";
import HeaderMenuDefault6 from "../HeaderMenuDefault6";
import HeaderMenuDefault5 from "../HeaderMenuDefault5";
import HeaderMenuDefault from "../HeaderMenuDefault";
import HeaderMenuDefault7 from "../HeaderMenuDefault7";
import "./LeadTime.css";
import "../../styleguide.css";

function LeadTime(props) {
  const {
    x1200PxLogo_Icam__20081,
    headerMenuDefault61Props,
    headerMenuDefault51Props,
    headerMenuDefault52Props,
    headerMenuDefaultProps,
    headerMenuDefault53Props,
    headerMenuDefault54Props,
    headerMenuDefault62Props,
  } = props;

  const [selectedOptions, setSelectedOptions] = React.useState({});
  const [l_yesCount, setL_yesCount] = React.useState(0);

  function clicked(question, option) {
    // Si l'option cliquée est la même que celle déjà sélectionnée, on la désélectionne
    if (selectedOptions[question] === option) {
      setSelectedOptions((prevSelectedOptions) => {
        const newOptions = { ...prevSelectedOptions };
        delete newOptions[question];
        return newOptions;
      });
      // Si on désélectionne un "Yes", on décrémente le score
      if (option === "Yes") {
        setL_yesCount((prevCount) => prevCount - 1);
      }
      return;
    }

    // Sinon, on met à jour la sélection
    const previousOption = selectedOptions[question];
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [question]: option,
    }));
    
    // Si on passe de "No" à "Yes", on incrémente le score
    if (option === "Yes" && previousOption !== "Yes") {
      setL_yesCount((prevCount) => prevCount + 1);
    }
    // Si on passe de "Yes" à "No", on décrémente le score
    else if (option === "No" && previousOption === "Yes") {
      setL_yesCount((prevCount) => prevCount - 1);
    }
  }

  return (
    <div className="environmental-container">
      <div className="environmental-header">
        <Link to="/home">
          <img
            className="logo-icam"
            src={x1200PxLogo_Icam__20081 || "../../assets/x1200PxLogo_Icam__20081.png"}
            alt="ICAM Logo"
          />
        </Link>
        <div className="nav-container">
          <div className="nav-items">
            <HeaderMenuDefault6>{headerMenuDefault61Props.children}</HeaderMenuDefault6>
            <HeaderMenuDefault5 className={headerMenuDefault51Props.className}>
              {headerMenuDefault51Props.children}
            </HeaderMenuDefault5>
            <HeaderMenuDefault5 className={headerMenuDefault52Props.className}>
              {headerMenuDefault52Props.children}
            </HeaderMenuDefault5>
            <div className="menu-item">
              <HeaderMenuDefault>{headerMenuDefaultProps.children}</HeaderMenuDefault>
            </div>
          </div>
        </div>
      </div>

      <div className="environmental-content">
        <h1 className="environmental-title">
          LEAD TIME ASSESSMENT
        </h1>
        
        <div className="lead-time-description">
          <p>This section will assess your company's lead time management practices. Please proceed to answer questions in the following subsections:</p>
          
          <div className="lead-time-sections">
            <Link to="/lead-time-1" className="section-button">
              Lead Time Part 1
            </Link>
            <Link to="/lead-time-2" className="section-button">
              Lead Time Part 2
            </Link>
          </div>
        </div>
        
        <div className="secondary-nav">
          <div className="secondary-nav-items">
            <HeaderMenuDefault7 />
            <HeaderMenuDefault5 className={headerMenuDefault53Props.className}>
              {headerMenuDefault53Props.children}
            </HeaderMenuDefault5>
            <HeaderMenuDefault5 className={headerMenuDefault54Props.className}>
              {headerMenuDefault54Props.children}
            </HeaderMenuDefault5>
            <div className="menu-item-secondary">
              <HeaderMenuDefault6 className={headerMenuDefault62Props.className}>
                {headerMenuDefault62Props.children}
              </HeaderMenuDefault6>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <Link to="/home" className="btn-secondary">
            Back
          </Link>
          <Link to="/lead-time-1" className="btn-primary">
            Start Lead Time Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeadTime;
