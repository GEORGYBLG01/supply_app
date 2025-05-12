import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Toggle from "../Toggle";
import Frame92 from "../Frame92";
import Frame93 from "../Frame93";
import "./DecisionalView3.css";

function DecisionalView3(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    procesView,
    navItems2Props,
    navItems3Props,
    toggleProps,
    frame92Props,
    frame93Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="decisional-view-3 screen">
        <div className="overlap-group-48">
          <div className="rectangle-3-20"></div>
          <NavItems2 className={navItems2Props.className} />
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-47"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <p className="please-answer-the-following-questions-18 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
          <Toggle
            className={toggleProps.className}
            buttonSecondaryProps={toggleProps.buttonSecondaryProps}
          />
          <Frame92
            className={frame92Props.className}
            toggleProps={frame92Props.toggleProps}
            group1021Props={frame92Props.group1021Props}
            group1022Props={frame92Props.group1022Props}
            group1023Props={frame92Props.group1023Props}
            group1024Props={frame92Props.group1024Props}
            group1025Props={frame92Props.group1025Props}
          />
          <Frame93
            toggleProps={frame93Props.toggleProps}
            group1021Props={frame93Props.group1021Props}
            group1022Props={frame93Props.group1022Props}
            group1023Props={frame93Props.group1023Props}
            group1024Props={frame93Props.group1024Props}
            group1025Props={frame93Props.group1025Props}
          />
        </div>
        <div className="frame-113-57">
          <div className="proces-view valign-text-middle inter-bold-mineral-green-18px">
            {procesView}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DecisionalView3;
