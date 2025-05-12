import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Toggle from "../Toggle";
import Frame101 from "../Frame101";
import Frame102 from "../Frame102";
import Frame11732 from "../Frame11732";
import "./X5s2.css";

function X5s2(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    navItems2Props,
    navItems3Props,
    toggleProps,
    frame101Props,
    frame102Props,
    frame11732Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="x5s-2 screen">
        <div className="overlap-group-70">
          <div className="rectangle-3-26"></div>
          <NavItems2 className={navItems2Props.className} />
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-69"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <p className="please-answer-the-following-questions-25 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
        </div>
        <div className="flex-row-139">
          <div className="overlap-group1-46">
            <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
            <Frame101
              className={frame101Props.className}
              toggleProps={frame101Props.toggleProps}
              group1021Props={frame101Props.group1021Props}
              group1022Props={frame101Props.group1022Props}
              group1023Props={frame101Props.group1023Props}
              group1024Props={frame101Props.group1024Props}
              group1025Props={frame101Props.group1025Props}
            />
          </div>
          <div className="frame-container-17">
            <Frame102
              className={frame102Props.className}
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

export default X5s2;
