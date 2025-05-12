import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Frame101 from "../Frame101";
import Frame102 from "../Frame102";
import Toggle from "../Toggle";
import "./Kaizen3.css";

function Kaizen3(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    smed,
    navItems2Props,
    navItems3Props,
    frame101Props,
    frame102Props,
    toggleProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="kaizen-3-1 screen">
        <div className="overlap-group-23">
          <div className="rectangle-3-10"></div>
          <NavItems2 className={navItems2Props.className} />
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-23"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <p className="please-answer-the-following-questions-4 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
          <Frame101
            className={frame101Props.className}
            toggleProps={frame101Props.toggleProps}
            group1021Props={frame101Props.group1021Props}
            group1022Props={frame101Props.group1022Props}
            group1023Props={frame101Props.group1023Props}
            group1024Props={frame101Props.group1024Props}
            group1025Props={frame101Props.group1025Props}
          />
          <Frame102
            className={frame102Props.className}
            toggleProps={frame102Props.toggleProps}
            group1021Props={frame102Props.group1021Props}
            group1022Props={frame102Props.group1022Props}
            group1023Props={frame102Props.group1023Props}
            group1024Props={frame102Props.group1024Props}
            group1025Props={frame102Props.group1025Props}
          />
        </div>
        <div className="flex-row-70">
          <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
          <div className="frame-117-94">
            <div className="smed-12 valign-text-middle inter-bold-mineral-green-18px">{smed}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kaizen3;
