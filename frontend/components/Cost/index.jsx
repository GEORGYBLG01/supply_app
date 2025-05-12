import React from "react";
import { Link } from "react-router-dom";
import HeaderMenuDefault6 from "../HeaderMenuDefault6";
import HeaderMenuDefault5 from "../HeaderMenuDefault5";
import HeaderMenuDefault from "../HeaderMenuDefault";
import HeaderMenuDefault7 from "../HeaderMenuDefault7";
import Toggle from "../Toggle";
import "./Cost.css";
import "../../styleguide.css";

function Cost(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    label1,
    label2,
    headerMenuDefault61Props,
    headerMenuDefault51Props,
    headerMenuDefault52Props,
    headerMenuDefaultProps,
    headerMenuDefault53Props,
    headerMenuDefault54Props,
    headerMenuDefault62Props,
    toggle1Props,
    toggle2Props,
  } = props;

  return (
    <div className="environmental-container">
      <div className="environmental-header">
        <Link to="/home">
          <img
            className="logo-icam"
            src={x1200PxLogo_Icam__20081}
            alt="ICAM Logo"
          />
        </Link>
        <div className="nav-container">
          <div className="nav-items-top">
            <a href="javascript:SubmitForm('form16')">
              <div className="nav-link">{label1}</div>
            </a>
            <HeaderMenuDefault6>{headerMenuDefault61Props.children}</HeaderMenuDefault6>
            <HeaderMenuDefault5 className={headerMenuDefault51Props.className}>
              {headerMenuDefault51Props.children}
            </HeaderMenuDefault5>
            <HeaderMenuDefault5 className={headerMenuDefault52Props.className}>
              {headerMenuDefault52Props.children}
            </HeaderMenuDefault5>
            <a href="javascript:SubmitForm('form16')">
              <div className="nav-link-frame">
                <HeaderMenuDefault>{headerMenuDefaultProps.children}</HeaderMenuDefault>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="environmental-content">
        <h1 className="environmental-title">
          {pleaseAnswerTheFollowingQuestions || "COST ASSESSMENT"}
        </h1>
        
        <div className="section-description">
          <p>
            This assessment will evaluate your organization's cost management practices across several key areas.
            The assessment is divided into two sections to thoroughly evaluate your cost management approach.
            Please respond to all questions to receive a comprehensive evaluation.
          </p>
        </div>

        <div className="assessment-options">
          <Link to="/cost-1" className="assessment-button">
            <span className="button-title">Section 1</span>
            <span className="button-description">Raw Materials and Stock Management</span>
          </Link>
          
          <Link to="/cost-2" className="assessment-button">
            <span className="button-title">Section 2</span>
            <span className="button-description">Market Analysis and Competition</span>
          </Link>
        </div>

        <div className="form-actions">
          <Link to="/home" className="btn-secondary">
            Back to Home
          </Link>
          <Link to="/cost-1" className="btn-primary">
            Start Assessment
          </Link>
        </div>
        
        <div className="toggle-wrapper">
          <Toggle className={toggle1Props.className} buttonSecondaryProps={toggle1Props.buttonSecondaryProps} />
          <Toggle className={toggle2Props.className} buttonSecondaryProps={toggle2Props.buttonSecondaryProps} />
        </div>
      </div>
    </div>
  );
}

export default Cost;
