import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Toggle from "../Toggle";
import "./VisualManagement3.css";

function VisualManagement3(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    goOnToTheNextStep,
    navItems2Props,
    navItems3Props,
    toggleProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="visual-management-3-1 screen">
        <div className="overlap-group-24">
          <div className="rectangle-3-11"></div>
          <NavItems2 className={navItems2Props.className} />
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-24"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <p className="please-answer-the-following-questions-5 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
        </div>
        <div className="flex-row-71">
          <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
          <Link to={"/functional-view-1"}>
          <div className="frame-116-177">
            <p className="go-on-to-the-next-step valign-text-middle inter-bold-mineral-green-18px">
              {goOnToTheNextStep}
            </p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VisualManagement3;
