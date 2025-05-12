import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Toggle from "../Toggle";
import "./ProcessView3.css";

function ProcessView3(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    informationalModel,
    navItems2Props,
    navItems3Props,
    toggleProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="process-view-3-1 screen">
        <div className="overlap-group-45">
          <div className="rectangle-3-17"></div>
          <NavItems2 className={navItems2Props.className} />
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-44"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <p className="please-answer-the-following-questions-15 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
        </div>
        <div className="flex-row-91">
          <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
          <div className="frame-113-55">
            <div className="informational-model-11 valign-text-middle inter-bold-mineral-green-18px">
              {informationalModel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessView3;
