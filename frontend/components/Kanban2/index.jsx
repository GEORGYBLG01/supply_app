import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Toggle from "../Toggle";
import Frame101 from "../Frame101";
import Frame102 from "../Frame102";
import Frame11732 from "../Frame11732";
import "./Kanban2.css";

function Kanban2(props) {
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
      <div className="kanban-2-1 screen">
        <div className="overlap-group-71">
          <div className="rectangle-3-27"></div>
          <NavItems2 className={navItems2Props.className} />
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-70"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <p className="please-answer-the-following-questions-26 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
        </div>
        <div className="overlap-group1-47">
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
  );
}

export default Kanban2;
