import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Frame922 from "../Frame922";
import Frame93 from "../Frame93";
import Toggle from "../Toggle";
import Frame11732 from "../Frame11732";
import "./FunctionnalView2.css";

function FunctionnalView2(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    navItems2Props,
    navItems3Props,
    frame922Props,
    frame93Props,
    toggleProps,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="functionnal-view-2 screen">
        <div className="overlap-group1-34">
          <div className="overlap-group-51">
            <div className="rectangle-3-22"></div>
            <NavItems2 className={navItems2Props.className} />
            <NavItems3
              className={navItems3Props.className}
              frame1172Props={navItems3Props.frame1172Props}
              frame1162Props={navItems3Props.frame1162Props}
              frame1132Props={navItems3Props.frame1132Props}
            />
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-50"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <p className="please-answer-the-following-questions-20 valign-text-middle bevan-normal-white-20px">
              {pleaseAnswerTheFollowingQuestions}
            </p>
            <Frame922
              toggleProps={frame922Props.toggleProps}
              group1021Props={frame922Props.group1021Props}
              group1022Props={frame922Props.group1022Props}
              group1023Props={frame922Props.group1023Props}
              group1024Props={frame922Props.group1024Props}
              group1025Props={frame922Props.group1025Props}
            />
          </div>
          <Frame93
            className={frame93Props.className}
            toggleProps={frame93Props.toggleProps}
            group1021Props={frame93Props.group1021Props}
            group1022Props={frame93Props.group1022Props}
            group1023Props={frame93Props.group1023Props}
            group1024Props={frame93Props.group1024Props}
            group1025Props={frame93Props.group1025Props}
          />
        </div>
        <div className="flex-row-93">
          <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
          <Frame11732 />
        </div>
      </div>
    </div>
  );
}

export default FunctionnalView2;
