import React from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Frame101 from "../Frame101";
import Frame102 from "../Frame102";
import Toggle from "../Toggle";
import "./Kanban3.css";

function Kanban3(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    kaizen,
    navItems3Props,
    frame101Props,
    frame102Props,
    toggleProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="kanban-3-1 screen">
        <div className="overlap-group1-45">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-67"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-36">
            <NavItems3
              className={navItems3Props.className}
              frame1172Props={navItems3Props.frame1172Props}
              frame1162Props={navItems3Props.frame1162Props}
              frame1132Props={navItems3Props.frame1132Props}
            />
            <NavItems2 />
          </div>
        </div>
        <div className="overlap-group2-23">
          <div className="overlap-group-68">
            <p className="please-answer-the-following-questions-24 valign-text-middle bevan-normal-white-20px">
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
            <div className="frame-117-103">
              <div className="kaizen-15 valign-text-middle inter-bold-mineral-green-18px">{kaizen}</div>
            </div>
          </div>
          <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
        </div>
      </div>
    </div>
  );
}

export default Kanban3;
