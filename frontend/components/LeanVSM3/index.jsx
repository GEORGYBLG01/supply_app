import React from "react";
import { Link } from "react-router-dom";
import NavItems3 from "../NavItems3";
import NavItems2 from "../NavItems2";
import Toggle from "../Toggle";
import Group102 from "../Group102";
import Frame11732 from "../Frame11732";
import "./LeanVSM3.css";

function LeanVSM3(props) {
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
    inputType6,
    inputPlaceholder6,
    inputType7,
    inputPlaceholder7,
    inputType8,
    inputPlaceholder8,
    inputType9,
    inputPlaceholder9,
    inputType10,
    inputPlaceholder10,
    navItems3Props,
    toggle1Props,
    group1021Props,
    group1022Props,
    group1023Props,
    group1024Props,
    group1025Props,
    toggle2Props,
    group1026Props,
    group1027Props,
    group1028Props,
    group1029Props,
    group10210Props,
    frame11732Props,
    toggle3Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="lean-vsm-3-1 screen">
        <div className="overlap-group1-48">
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-72"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <div className="nav-items-container-38">
            <NavItems3
              className={navItems3Props.className}
              frame1172Props={navItems3Props.frame1172Props}
              frame1162Props={navItems3Props.frame1162Props}
              frame1132Props={navItems3Props.frame1132Props}
            />
            <NavItems2 />
          </div>
        </div>
        <div className="overlap-group2-24">
          <div className="overlap-group3-22">
            <div className="overlap-group-73">
              <p className="please-answer-the-following-questions-28 valign-text-middle bevan-normal-white-20px">
                {pleaseAnswerTheFollowingQuestions}
              </p>
              <div className="frame-93-3">
                <Toggle className={toggle1Props.className} buttonSecondaryProps={toggle1Props.buttonSecondaryProps} />
                <input
                  className="a-quelle-frquence-re-9 subtitel"
                  name="aquellefréquencerenouvelezvousvotrestock"
                  placeholder={inputPlaceholder1}
                  type={inputType1}
                />
                <Group102 line24={group1021Props.line24} />
                <input
                  className="combien-de-temps-en-9 subtitel"
                  name="combiendetempsenmoyenneunarticleeffectuedansvotremagazin"
                  placeholder={inputPlaceholder2}
                  type={inputType2}
                />
                <Group102 line24={group1022Props.line24} />
                <input
                  className="vous-9 subtitel"
                  name="vousarrive-t-ildavoirdesrupturesdestocksiouiàquellefréquence"
                  placeholder={inputPlaceholder3}
                  type={inputType3}
                />
                <Group102 line24={group1023Props.line24} />
                <input
                  className="vous-9 subtitel"
                  name="avezvousmisenplacedemesuresdamélioration"
                  placeholder={inputPlaceholder4}
                  type={inputType4}
                />
                <Group102 line24={group1024Props.line24} />
                <input
                  className="x-19 subtitel"
                  name="*******************************************"
                  placeholder={inputPlaceholder5}
                  type={inputType5}
                />
                <Group102 line24={group1025Props.line24} />
              </div>
              <div className="frame-94-3">
                <Toggle className={toggle2Props.className} buttonSecondaryProps={toggle2Props.buttonSecondaryProps} />
                <input
                  className="dans-quel-rayon-se-situe-vos-clients-10 subtitel"
                  name="dansquelrayonsesituevosclients"
                  placeholder={inputPlaceholder6}
                  type={inputType6}
                />
                <Group102 line24={group1026Props.line24} />
                <input
                  className="a-quelle-frquence-ef subtitel"
                  name="aquellefréquenceeffectuezvousdeslivraisons"
                  placeholder={inputPlaceholder7}
                  type={inputType7}
                />
                <Group102 line24={group1027Props.line24} />
                <input
                  className="quel-est-votre-taux-de-service subtitel"
                  name="quelestvotretauxdeservice"
                  placeholder={inputPlaceholder8}
                  type={inputType8}
                />
                <Group102 line24={group1028Props.line24} />
                <input
                  className="quel-est-votre-taux-de-retard-10 subtitel"
                  name="quelestvotretauxderetard"
                  placeholder={inputPlaceholder9}
                  type={inputType9}
                />
                <Group102 line24={group1029Props.line24} />
                <input
                  className="x-20 subtitel"
                  name="*************************************"
                  placeholder={inputPlaceholder10}
                  type={inputType10}
                />
                <Group102 line24={group10210Props.line24} />
              </div>
            </div>
            <Frame11732 className={frame11732Props.className} />
          </div>
          <Toggle className={toggle3Props.className} buttonSecondaryProps={toggle3Props.buttonSecondaryProps} />
        </div>
      </div>
    </div>
  );
}

export default LeanVSM3;
