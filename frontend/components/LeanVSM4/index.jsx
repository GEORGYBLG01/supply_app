import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Toggle from "../Toggle";
import Group102 from "../Group102";
import Frame102 from "../Frame102";
import "./LeanVSM4.css";

function LeanVSM4(props) {
  const {
    x1200PxLogo_Icam__20081,
    pleaseAnswerTheFollowingQuestions,
    inputType1,
    inputPlaceholder1,
    inputType2,
    inputPlaceholder2,
    inputType3,
    inputPlaceholder3,
    inputType4,
    inputPlaceholder4,
    inputType5,
    inputPlaceholder5,
    x5S,
    navItems2Props,
    navItems3Props,
    toggle1Props,
    toggle2Props,
    group1021Props,
    group1022Props,
    group1023Props,
    group1024Props,
    group1025Props,
    frame102Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="lean-vsm-4-1 screen">
        <div className="overlap-group-76">
          <div className="rectangle-3-30"></div>
          <NavItems2 className={navItems2Props.className} />
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-76"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <p className="please-answer-the-following-questions-30 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
          <Toggle className={toggle1Props.className} buttonSecondaryProps={toggle1Props.buttonSecondaryProps} />
          <div className="frame-95-5">
            <Toggle className={toggle2Props.className} buttonSecondaryProps={toggle2Props.buttonSecondaryProps} />
            <input
              className="a-quelle-frquence-re-11 subtitel"
              name="aquellefréquencerenouvelezvousvotrestock"
              placeholder={inputPlaceholder1}
              type={inputType1}
            />
            <Group102 line24={group1021Props.line24} className={group1021Props.className} />
            <input
              className="combien-de-temps-en-11 subtitel"
              name="combiendetempsenmoyenneunarticleeffectuedansvotremagazin"
              placeholder={inputPlaceholder2}
              type={inputType2}
            />
            <Group102 line24={group1022Props.line24} className={group1022Props.className} />
            <input
              className="vous-11 subtitel"
              name="vousarrive-t-ildavoirdesrupturesdestocksiouiàquellefréquence"
              placeholder={inputPlaceholder3}
              type={inputType3}
            />
            <Group102 line24={group1023Props.line24} className={group1023Props.className} />
            <input
              className="vous-11 subtitel"
              name="avezvousmisenplacedemesuresdamélioration"
              placeholder={inputPlaceholder4}
              type={inputType4}
            />
            <Group102 line24={group1024Props.line24} className={group1024Props.className} />
            <input
              className="x-23 subtitel"
              name="*******************************************"
              placeholder={inputPlaceholder5}
              type={inputType5}
            />
            <Group102 line24={group1025Props.line24} className={group1025Props.className} />
          </div>
          <Frame102
            className={frame102Props.className}
            toggleProps={frame102Props.toggleProps}
            group1021Props={frame102Props.group1021Props}
            group1022Props={frame102Props.group1022Props}
            group1023Props={frame102Props.group1023Props}
            group1024Props={frame102Props.group1024Props}
            group1025Props={frame102Props.group1025Props}
          />
          <div className="frame-117-106">
            <div className="x5-s-14 valign-text-middle inter-bold-mineral-green-18px">{x5S}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeanVSM4;
