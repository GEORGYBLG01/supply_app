import React from "react";
import HeaderMenuDefault from "../HeaderMenuDefault";
import Frame11432 from "../Frame11432";
import Frame11532 from "../Frame11532";
import Frame11722 from "../Frame11722";
import Frame11622 from "../Frame11622";
import Frame11322 from "../Frame11322";
import Frame1 from "../Frame1";
import Frame12 from "../Frame12";
import "./Home.css";

function Home(props) {
  const {
    x1200PxLogo_Icam__20081,
    takeYourCompanyToTheNextLevel,
    discoverFromDiffer,
    newCase,
    existingCase,
    referenceCase,
    headerMenuDefaultProps,
    frame11722Props,
    frame11622Props,
    frame11Props,
    frame12Props,
    frame13Props,
  } = props;

  const handleNavigation = (path) => {
    window.location.href = path; // Utilisation de window.location.href pour rediriger
  };

  return (
    <div className="container-center-horizontal">
      <form
        className="home screen"
        name="form5"
        action="form5"
        method="post"
      >
        <div className="flex-row-4">
          <div className="flex-col-2">
            <img
              className="x1200px-logo_icam_-_2008-1-1"
              src={x1200PxLogo_Icam__20081}
              alt="1200px-Logo_ICAM_-_2008 1"
              onClick={() => handleNavigation("/home")}
            />
            <div className="overlap-group2-1">
              <h1 className="take-your-company-to-the-next-level valign-text-middle">
                {takeYourCompanyToTheNextLevel}
              </h1>
              <p className="discover-from-differ">{discoverFromDiffer}</p>
            </div>
            <div className="frame-2-1">
              <HeaderMenuDefault>{headerMenuDefaultProps.children}</HeaderMenuDefault>
            </div>
          </div>
          <div className="flex-col-3">
            <div className="nav-items-3">
              <Frame11432 />
              <Frame11532 />
              <Frame11722>{frame11722Props.children}</Frame11722>
              <Frame11622>{frame11622Props.children}</Frame11622>
              <Frame11322 />
            </div>
            <div className="overlap-group-container">
              <div className="overlap-group1-18">
                <div className="frame-3" onClick={() => handleNavigation("/acquisition")}>
                  <Frame1 src={frame11Props.src} />
                </div>
                <div
                  className="new-case valign-text-middle poppins-medium-mine-shaft-24px"
                  onClick={() => handleNavigation("/acquisition")}
                >
                  {newCase}
                </div>
              </div>
              <div className="overlap-group4-1">
                <div
                  className="group-79"
                  onClick={() => handleNavigation("/existing-case")}
                >
                  <Frame12 />
                </div>
                <div
                  className="group-80"
                  onClick={() => handleNavigation("/existing-case")}
                >
                  <Frame1 src={frame12Props.src} className={frame12Props.className} />
                </div>
                <div
                  className="existing-case-62 valign-text-middle poppins-medium-mine-shaft-24px"
                  onClick={() => handleNavigation("/existing-case")}
                >
                  {existingCase}
                </div>
              </div>
              <div className="overlap-group3-1">
                <div
                  className="frame-3-1"
                  onClick={() => handleNavigation("/cur-performance")}
                >
                  <Frame1 src={frame13Props.src} className={frame13Props.className} />
                </div>
                <div
                  className="reference-case valign-text-middle poppins-medium-mine-shaft-24px"
                  onClick={() => handleNavigation("/cur-performance")}
                >
                  {referenceCase}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ajout du bouton "Get Started" */}

      </form>
    </div>
  );
}

export default Home;
