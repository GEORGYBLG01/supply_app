import React from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Toggle from "../Toggle";
import Group102 from "../Group102";
import Frame97 from "../Frame97";
import Frame11732 from "../Frame11732";
import "./InformationalModel2.css";

function InformationalModel2(props) {
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
    navItems3Props,
    toggle1Props,
    toggle2Props,
    group1021Props,
    group1022Props,
    group1023Props,
    group1024Props,
    group1025Props,
    frame97Props,
    frame11732Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="informational-model-2-1 screen">
        <div className="flex-col-52">
          <div className="overlap-group-42">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-41"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-container-19">
              <NavItems3
                className={navItems3Props.className}
                frame1172Props={navItems3Props.frame1172Props}
                frame1162Props={navItems3Props.frame1162Props}
                frame1132Props={navItems3Props.frame1132Props}
              />
              <NavItems2 />
            </div>
          </div>
          <p className="please-answer-the-following-questions-13 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
        </div>
        <div className="flex-row-89">
          <div className="overlap-group1-33">
            <Toggle className={toggle1Props.className} buttonSecondaryProps={toggle1Props.buttonSecondaryProps} />
            <div className="frame-96-3">
              <Toggle className={toggle2Props.className} buttonSecondaryProps={toggle2Props.buttonSecondaryProps} />
              <input
                className="vos-employs-sont-ils subtitel"
                name="vosemployéssont-ilsforcedepropositionsconcernantlesinnovations"
                placeholder={inputPlaceholder1}
                type={inputType1}
              />
              <Group102 line24={group1021Props.line24} />
              <input
                className="avez-vous-un-managem subtitel"
                name="avezvousunmanagementquifavoriselcréativitédessalariés"
                placeholder={inputPlaceholder2}
                type={inputType2}
              />
              <Group102 line24={group1022Props.line24} />
              <input
                className="sez-vous subtitel"
                name="garantissezvouslégalitédeschancesdetouslestravailleurscomment"
                placeholder={inputPlaceholder3}
                type={inputType3}
              />
              <Group102 line24={group1023Props.line24} />
              <input
                className="sez-vous subtitel"
                name="quelmanagementutilisezvous"
                placeholder={inputPlaceholder4}
                type={inputType4}
              />
              <Group102 line24={group1024Props.line24} />
              <input
                className="est-ce-que-les-journ subtitel"
                name="est-cequelesjournéesdetravailsontadaptéesauvolumedetravail"
                placeholder={inputPlaceholder5}
                type={inputType5}
              />
              <Group102 line24={group1025Props.line24} />
            </div>
          </div>
          <div className="frame-container-11">
            <Frame97
              toggleProps={frame97Props.toggleProps}
              group1021Props={frame97Props.group1021Props}
              group1022Props={frame97Props.group1022Props}
              group1023Props={frame97Props.group1023Props}
              group1024Props={frame97Props.group1024Props}
              group1025Props={frame97Props.group1025Props}
            />
            <Frame11732 className={frame11732Props.className} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationalModel2;
