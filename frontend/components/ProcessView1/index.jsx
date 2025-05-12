import React, { useState } from "react";
import { Link } from "react-router-dom";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import Frame11322 from "../Frame11322";
import Frame11632 from "../Frame11632";
import Frame11622 from "../Frame11622";
import Frame1173 from "../Frame1173";
import Frame118 from "../Frame118";
import Frame11342 from "../Frame11342";
import "./ProcessView1.css";

function ProcessView1(props) {
  const {
    x1200PxLogo_Icam__20081,
    aquisition,
    functionalView,
    arrow1,
    arrow2,
    rectangle7,
    line3,
    line4,
    line2,
    label1,
    textFormat,
    label2,
    line1,
    place,
    clickOnFlexsimB,
    overlapGroup1,
    cut,
    label3,
    rectangle5,
    manufacturing,
    arrow6,
    arrow11,
    label4,
    arrow8,
    label5,
    arrow9,
    flexsim,
    rectangle6,
    assembly,
    arrow10,
    xcontinue,
    frame11622Props,
    frame118Props,
  } = props;

  // Define state variables for form inputs
  const [error, setError] = useState("");

  // Define function to handle form submission
  const launchFlexsim = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(window.env.API_URL + "/open-VMWarehorizon");

      const responseData = await response.json();
      console.log(responseData);

      // If successful login, open VMware Horizon View Client
      window.open(
        "C:\\Program Files\\VMware\\VMware Horizon View Client\\vmware-view.exe"
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-center-horizontal">
      <div className="process-view-1-1 screen">
        <div className="overlap-group4-4">
          <div className="flex-row-20">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-7"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-2-10">
              <div className="frame-113-42">
                <div className="aquisition-88 valign-text-middle inter-medium-sonic-silver-18px">
                  {aquisition}
                </div>
              </div>
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
          </div>
          <div className="nav-items-4-5">
            <Link to="/functional-view-1">
              <div className="frame-114-93">
                <div className="functional-view-8 valign-text-middle inter-medium-star-dust-18px">
                  {functionalView}
                </div>
              </div>
            </Link>
            <Frame11632 />
            <Frame11622>{frame11622Props.children}</Frame11622>
            <Frame1173 />
            <Frame118>{frame118Props.children}</Frame118>
            <Frame11342 />
          </div>
        </div>
        <div className="flex-row-21">
          <div className="flex-row-22">
            <div className="flex-col-11 inter-medium-rum-swizzle-18-1px">
              <div className="arrow-container-4">
                <img className="arrow-1-3" src={arrow1} alt="Arrow 1" />
                <img className="arrow-2-3" src={arrow2} alt="Arrow 2" />
              </div>
              <img className="rectangle-7" src={rectangle7} alt="Rectangle 7" />
              <div className="flex-row-23">
                <div className="ellipse-85-3"></div>
                <div className="frame-3-2">
                  <img className="line-3-2" src={line3} alt="Line 3" />
                  <img className="line-4-1" src={line4} alt="Line 4" />
                </div>
              </div>
              <div className="frame-4-4"></div>
              <div className="overlap-group-9">
                <img className="line-2-4" src={line2} alt="Line 2" />
                <div className="ellipse-86-4"></div>
              </div>
              <div className="label-26">{label1}</div>
              <img
                className="text-format-4"
                src={textFormat}
                alt="Text format"
              />
              <div className="label-27">{label2}</div>
            </div>
            <img className="line-1-4" src={line1} alt="Line 1" />
          </div>
          <div className="flex-col-12">
            <div className="flex-row-24">
              <Link to="/decisional-model-1">
                <div className="frame-11-4">
                  <div className="place-70 valign-text-middle inter-bold-tropical-rain-forest-18px">
                    {place}
                  </div>
                </div>
              </Link>
              <p className="click-on-flexsim-b valign-text-middle bevan-normal-white-20px">
                {clickOnFlexsimB}
              </p>
            </div>
            <div className="flex-row-25">
              <div className="flex-col-13">
                <div className="flex-row-26">
                  <div
                    className="overlap-group1-22"
                    style={{ backgroundImage: `url(${overlapGroup1})` }}
                  >
                    <div className="cut valign-text-middle inter-bold-mineral-green-18px">
                      {cut}
                    </div>
                  </div>
                  <div className="flex-col-14">
                    <div className="overlap-group2-5">
                      <div className="label-28 inter-medium-rum-swizzle-18-1px">
                        {label3}
                      </div>
                      <img
                        className="rectangle-5"
                        src={rectangle5}
                        alt="Rectangle 5"
                      />
                      <div className="manufacturing-4 valign-text-middle inter-bold-mineral-green-18px">
                        {manufacturing}
                      </div>
                      <img className="arrow-6-3" src={arrow6} alt="Arrow 6" />
                      <img className="arrow-11" src={arrow11} alt="Arrow 11" />
                    </div>
                    <div className="overlap-group-container-5 inter-medium-rum-swizzle-18-1px">
                      <div className="overlap-group5-2">
                        <div className="label-29">{label4}</div>
                        <img className="arrow-8-3" src={arrow8} alt="Arrow 8" />
                      </div>
                      <div className="overlap-group7">
                        <div className="label-30">{label5}</div>
                        <img className="arrow-9-2" src={arrow9} alt="Arrow 9" />
                      </div>
                    </div>
                  </div>
                </div>

                <button className="frame-9-4" onClick={launchFlexsim}>
                  <div className="flexsim valign-text-middle inter-bold-mineral-green-18px">
                    {flexsim}
                  </div>
                </button>
              </div>
              <div className="flex-col-15">
                <div className="overlap-group3-5">
                  <img
                    className="rectangle-6"
                    src={rectangle6}
                    alt="Rectangle 6"
                  />
                  <div className="assembly valign-text-middle inter-bold-mineral-green-18px">
                    {assembly}
                  </div>
                  <img className="arrow-10" src={arrow10} alt="Arrow 10" />
                </div>
                <Link
                  to="/informational-model-1"
                  className="align-self-flex-end"
                >
                  <div className="frame-2-4">
                    <div className="continue-3 valign-text-middle inter-bold-mineral-green-18px">
                      {xcontinue}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessView1;
