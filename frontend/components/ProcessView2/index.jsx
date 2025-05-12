import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Frame96 from "../Frame96";
import Frame97 from "../Frame97";
import Frame11732 from "../Frame11732";
import Toggle from "../Toggle";
import "./ProcessView2.css";

function ProcessView2(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    navItems2Props,
    navItems3Props,
    frame96Props,
    frame97Props,
    frame11732Props,
    toggleProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="process-view-2-1 screen">
        <div className="overlap-group-43">
          <div className="rectangle-3-16"></div>
          <NavItems2 className={navItems2Props.className} />
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-42"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <p className="please-answer-the-following-questions-14 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
          <Frame96
            toggleProps={frame96Props.toggleProps}
            group1021Props={frame96Props.group1021Props}
            group1022Props={frame96Props.group1022Props}
            group1023Props={frame96Props.group1023Props}
            group1024Props={frame96Props.group1024Props}
            group1025Props={frame96Props.group1025Props}
          />
          <Frame97
            className={frame97Props.className}
            toggleProps={frame97Props.toggleProps}
            group1021Props={frame97Props.group1021Props}
            group1022Props={frame97Props.group1022Props}
            group1023Props={frame97Props.group1023Props}
            group1024Props={frame97Props.group1024Props}
            group1025Props={frame97Props.group1025Props}
          />
        </div>
        <Frame11732 className={frame11732Props.className} />
        <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
      </div>
    </div>
  );
}

export default ProcessView2;
