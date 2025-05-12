import React from "react";
import { Link } from "react-router-dom";
import Frame11432 from "../Frame11432";
import Frame1152 from "../Frame1152";
import HeaderMenuDefault2 from "../HeaderMenuDefault2";
import Frame11322 from "../Frame11322";
import Frame1144 from "../Frame1144";
import Frame232 from "../Frame232";
import Frame101 from "../Frame101";
import Toggle from "../Toggle";
import Frame102 from "../Frame102";
import Frame11732 from "../Frame11732";
import "./SMED2.css";

function SMED2(props) {
  const {
    x1200PxLogo_Icam__20081,
    label1,
    aquisition,
    analysis,
    label2,
    pleaseAnswerTheFollowingQuestions,
    frame11432Props,
    frame1152Props,
    headerMenuDefault2Props,
    frame11322Props,
    frame1144Props,
    frame232Props,
    frame101Props,
    toggleProps,
    frame102Props,
    frame11732Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="smed-2-1 screen">
        <div className="flex-col-46">
          <div className="overlap-group-20">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-20"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-container-6">
              <div className="nav-items-3-66">
                <Frame11432 className={frame11432Props.className} />
                <Frame1152 className={frame1152Props.className} />
                <Link to="/existing-case">
                  <div className="frame-2-17">
                    <HeaderMenuDefault2>{headerMenuDefault2Props.children}</HeaderMenuDefault2>
                  </div>
                </Link>
                <Link to="/cur-performance">
                  <div className="label-128 inter-medium-sonic-silver-18-1px">{label1}</div>
                </Link>
                <Frame11322 className={frame11322Props.className} />
              </div>
              <div className="nav-items-2-34">
                <div className="frame-113-48">
                  <div className="aquisition-90 valign-text-middle inter-medium-rum-swizzle-18px">{aquisition}</div>
                </div>
                <Frame1144 className={frame1144Props.className} />
                <div className="frame-115-116">
                  <div className="analysis-90 valign-text-middle inter-medium-sonic-silver-18px">{analysis}</div>
                </div>
                <Frame232 headerMenuDefault2Props={frame232Props.headerMenuDefault2Props} />
                <Link to="/functional-view">
                  <div className="label-128 inter-medium-sonic-silver-18-1px">{label2}</div>
                </Link>
              </div>
            </div>
          </div>
          <p className="please-answer-the-following-questions-1 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
        </div>
        <div className="flex-row-67">
          <div className="flex-col-47">
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
          <div className="frame-container-9">
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

export default SMED2;
