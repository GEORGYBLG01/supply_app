import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Frame101 from "../Frame101";
import Toggle from "../Toggle";
import Frame102 from "../Frame102";
import Frame11732 from "../Frame11732";
import "./VisualManagement2.css";

function VisualManagement2(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    navItems2Props,
    navItems3Props,
    frame101Props,
    toggleProps,
    frame102Props,
    frame11732Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="visual-management-2-1 screen">
        <div className="overlap-group-22">
          <div className="rectangle-3-9"></div>
          <NavItems2 className={navItems2Props.className} />
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-22"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <p className="please-answer-the-following-questions-3 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
        </div>
        <div className="flex-row-69">
          <div className="flex-col-48">
            <Frame101
              toggleProps={frame101Props.toggleProps}
              group1021Props={frame101Props.group1021Props}
              group1022Props={frame101Props.group1022Props}
              group1023Props={frame101Props.group1023Props}
              group1024Props={frame101Props.group1024Props}
              group1025Props={frame101Props.group1025Props}
            />
            <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
          </div>
          <div className="frame-container-10">
            <Frame102
              toggleProps={frame102Props.toggleProps}
              group1021Props={frame102Props.group1021Props}
              group1022Props={frame102Props.group1022Props}
              group1023Props={frame102Props.group1023Props}
              group1024Props={frame102Props.group1024Props}
              group1025Props={frame102Props.group1025Props}
            />
            <Frame11732 className={frame11732Props.className} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualManagement2;
