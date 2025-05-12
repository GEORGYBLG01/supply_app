import React from "react";
import { Link } from "react-router-dom";
import NavItems2 from "../NavItems2";
import NavItems3 from "../NavItems3";
import Toggle from "../Toggle";
import Frame136 from "../Frame136";
import Frame144 from "../Frame144";
import "./ClientConsommateur3.css";

function ClientConsommateur3(props) {
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
    goOnToTheNextStep,
    navItems2Props,
    navItems3Props,
    toggle1Props,
    frame1361Props,
    frame1362Props,
    frame1363Props,
    toggle2Props,
    frame1364Props,
    frame1365Props,
    frame1366Props,
    toggle3Props,
    frame1367Props,
    frame144Props,
    frame1368Props,
    toggle4Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="client-consommateur-3 screen">
        <div className="overlap-group-86">
          <div className="rectangle-3-31"></div>
          <NavItems2 className={navItems2Props.className} />
          <NavItems3
            className={navItems3Props.className}
            frame1172Props={navItems3Props.frame1172Props}
            frame1162Props={navItems3Props.frame1162Props}
            frame1132Props={navItems3Props.frame1132Props}
          />
          <Link to="/home">
            <img
              className="x1200px-logo_icam_-_2008-1-86"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
            />
          </Link>
          <p className="please-answer-the-following-questions-31 valign-text-middle bevan-normal-white-20px">
            {pleaseAnswerTheFollowingQuestions}
          </p>
        </div>
        <div className="emploirelation-employeur-employ-15">
          <div className="emploi-relation-employeur-employ-1-12">
            <Toggle className={toggle1Props.className} buttonSecondaryProps={toggle1Props.buttonSecondaryProps} />
            <input
              className="do-you-do-reviews-1 subtitel"
              name="doyoudoreviews"
              placeholder={inputPlaceholder1}
              type={inputType1}
            />
            <Frame136 ouinonProps={frame1361Props.ouinonProps} />
            <input
              className="in-paper-format-3 subtitel"
              name="inpaperformat"
              placeholder={inputPlaceholder2}
              type={inputType2}
            />
            <Frame136 ouinonProps={frame1362Props.ouinonProps} />
            <input
              className="in-digital-format-3 subtitel"
              name="indigitalformat"
              placeholder={inputPlaceholder3}
              type={inputType3}
            />
            <Frame136 ouinonProps={frame1363Props.ouinonProps} />
          </div>
          <div className="emploi-relation-employeur-employ-3-4">
            <Toggle className={toggle2Props.className} buttonSecondaryProps={toggle2Props.buttonSecondaryProps} />
            <textarea
              className="do-you-have-a-review-2 subtitel"
              name="doyouhaveareviewspecifyingrequirementsnotformulatedbythecustomerbutnecessaryforthespecifieduse"
              placeholder={inputPlaceholder4}
              type={inputType4}
            ></textarea>
            <Frame136 ouinonProps={frame1364Props.ouinonProps} />
            <input
              className="in-paper-format-4 subtitel"
              name="inpaperformat"
              placeholder={inputPlaceholder5}
              type={inputType5}
            />
            <Frame136 ouinonProps={frame1365Props.ouinonProps} />
            <input
              className="in-digital-format-4 subtitel"
              name="indigitalformat"
              placeholder={inputPlaceholder6}
              type={inputType6}
            />
            <Frame136 ouinonProps={frame1366Props.ouinonProps} />
          </div>
          <div className="emploi-relation-employeur-employ-2-13">
            <Toggle className={toggle3Props.className} buttonSecondaryProps={toggle3Props.buttonSecondaryProps} />
            <input
              className="do-you-have-a-review-3 subtitel"
              name="doyouhaveareviewspecifyingtherequirementsoftheorganisation"
              placeholder={inputPlaceholder7}
              type={inputType7}
            />
            <Frame136 ouinonProps={frame1367Props.ouinonProps} />
            <input
              className="in-paper-format-5 subtitel"
              name="inpaperformat"
              placeholder={inputPlaceholder8}
              type={inputType8}
            />
            <Frame144 frame133Props={frame144Props.frame133Props} />
            <input
              className="in-digital-format-5 subtitel"
              name="indigitalformat"
              placeholder={inputPlaceholder9}
              type={inputType9}
            />
            <Frame136 ouinonProps={frame1368Props.ouinonProps} />
          </div>
        </div>
        <div className="flex-row-153">
          <Toggle className={toggle4Props.className} buttonSecondaryProps={toggle4Props.buttonSecondaryProps} />
          <div className="frame-113-69">
            <p className="go-on-to-the-next-step-1 valign-text-middle inter-bold-mineral-green-18px">
              {goOnToTheNextStep}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientConsommateur3;
