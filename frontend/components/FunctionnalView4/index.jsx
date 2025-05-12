import React from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Toggle from "../Toggle";
import Group102 from "../Group102";
import "./FunctionnalView4.css";

function FunctionnalView4(props) {
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
    physicalModel,
    navItems3Props,
    toggle1Props,
    group1021Props,
    group1022Props,
    group1023Props,
    group1024Props,
    toggle2Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="functionnal-view-4 screen">
        <div className="overlap-group-53">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-52"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-22">
            <NavItems3
              className={navItems3Props.className}
              frame1172Props={navItems3Props.frame1172Props}
              frame1162Props={navItems3Props.frame1162Props}
              frame1132Props={navItems3Props.frame1132Props}
            />
            <NavItems2 />
          </div>
        </div>
        <p className="please-answer-the-following-questions-22 valign-text-middle bevan-normal-white-20px">
          {pleaseAnswerTheFollowingQuestions}
        </p>
        <div className="frame-85-2">
          <Toggle className={toggle1Props.className} buttonSecondaryProps={toggle1Props.buttonSecondaryProps} />
          <input
            className="traitez-vous-vos-dchets subtitel"
            name="traitezvousvosdéchets"
            placeholder={inputPlaceholder1}
            type={inputType1}
          />
          <Group102 line24={group1021Props.line24} className={group1021Props.className} />
          <input
            className="quel-type-demballage-utilisez-vous subtitel"
            name="queltypedemballageutilisezvous"
            placeholder={inputPlaceholder2}
            type={inputType2}
          />
          <Group102 line24={group1022Props.line24} className={group1022Props.className} />
          <input
            className="frame-85-item subtitel"
            name="lagestiondeseauxuséesfaitellepartiedevotrepolitique"
            placeholder={inputPlaceholder3}
            type={inputType3}
          />
          <Group102 line24={group1023Props.line24} />
          <input
            className="frame-85-item subtitel"
            name="yat-ilunetraçabilitédutraitementdevosdéchets"
            placeholder={inputPlaceholder4}
            type={inputType4}
          />
          <Group102 line24={group1024Props.line24} />
        </div>
        <div className="flex-row-94">
          <Toggle className={toggle2Props.className} buttonSecondaryProps={toggle2Props.buttonSecondaryProps} />
          <Link to="/physical-model-2">
            <div className="frame-113-59">
              <div className="physical-model-11 valign-text-middle inter-bold-mineral-green-18px">{physicalModel}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FunctionnalView4;
