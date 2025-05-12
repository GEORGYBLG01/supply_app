import React, { useState } from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import NavItems44 from "../NavItems44";
import "./ProcessView.css";

function ProcessView(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
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
    overlapGroup2,
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
    spanText1,
    spanText2,
    rectangle6,
    assembly,
    arrow10,
    xcontinue,
    navItems44Props,
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
      <div className="process-view-10 screen">
        <div className="overlap-group-19">
          <div className="flex-row-61">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-19"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-2-30">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117-92">
                <div className="design-77 valign-text-middle inter-medium-sonic-silver-18px">
                  {design}
                </div>
              </div>
              <Frame11322 />
            </div>
          </div>
          <NavItems44
            frame1162Props={navItems44Props.frame1162Props}
            frame118Props={navItems44Props.frame118Props}
          />
        </div>
        <div className="flex-row-62">
          <div className="flex-row-63">
            <div className="flex-col-42 inter-medium-rum-swizzle-18-1px">
              <div className="arrow-container-13">
                <img className="arrow-1-10" src={arrow1} alt="Arrow 1" />
                <img className="arrow-2-9" src={arrow2} alt="Arrow 2" />
              </div>
              <img
                className="rectangle-7-3"
                src={rectangle7}
                alt="Rectangle 7"
              />
              <div className="flex-row-64">
                <div className="ellipse-85-8"></div>
                <div className="frame-3-4">
                  <img className="line-3-5" src={line3} alt="Line 3" />
                  <img className="line-4-3" src={line4} alt="Line 4" />
                </div>
              </div>
              <div className="frame-4-51"></div>
              <div className="overlap-group3-11">
                <img className="line-2-12" src={line2} alt="Line 2" />
                <div className="ellipse-86-12"></div>
              </div>
              <div className="label-123">{label1}</div>
              <img
                className="text-format-12"
                src={textFormat}
                alt="Text format"
              />
              <div className="label-124">{label2}</div>
            </div>
            <img className="line-1-12" src={line1} alt="Line 1" />
            <Link to="/decisional-model">
              <div className="frame-8-4">
                <div className="place-248 valign-text-middle inter-bold-tropical-rain-forest-18px">
                  {place}
                </div>
              </div>
            </Link>
          </div>
          <div className="flex-container">
            <p className="click-on-flexsim-b-1 valign-text-middle bevan-normal-white-20px">
              {clickOnFlexsimB}
            </p>
            <div className="flex-row-65">
              <div className="flex-col-43">
                <div className="flex-row-66">
                  <div
                    className="overlap-group2-11"
                    style={{ backgroundImage: `url(${overlapGroup2})` }}
                  >
                    <div className="cut-1 valign-text-middle inter-bold-mineral-green-18px">
                      {cut}
                    </div>
                  </div>
                  <div className="flex-col-44">
                    <div className="overlap-group1-31">
                      <div className="label-125 inter-medium-rum-swizzle-18-1px">
                        {label3}
                      </div>
                      <img
                        className="rectangle-5-3"
                        src={rectangle5}
                        alt="Rectangle 5"
                      />
                      <div className="manufacturing-5 valign-text-middle inter-bold-mineral-green-18px">
                        {manufacturing}
                      </div>
                      <img className="arrow-6-9" src={arrow6} alt="Arrow 6" />
                      <img
                        className="arrow-11-2"
                        src={arrow11}
                        alt="Arrow 11"
                      />
                    </div>
                    <div className="overlap-group-container-6 inter-medium-rum-swizzle-18-1px">
                      <div className="overlap-group4-9">
                        <div className="label-126">{label4}</div>
                        <img className="arrow-8-8" src={arrow8} alt="Arrow 8" />
                      </div>
                      <div className="overlap-group7-1">
                        <div className="label-127">{label5}</div>
                        <img className="arrow-9-7" src={arrow9} alt="Arrow 9" />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="frame-9-4" onClick={launchFlexsim}>
                  <div className="flexsim-1 valign-text-middle inter-bold-tropical-rain-forest-18px">
                    <div className="flexsim valign-text-middle inter-bold-mineral-green-18px">
                      Flexsim
                    </div>
                  </div>
                </button>
              </div>
              <div className="flex-col-45">
                <div className="overlap-group5-7">
                  <img
                    className="rectangle-6-3"
                    src={rectangle6}
                    alt="Rectangle 6"
                  />
                  <div className="assembly-1 valign-text-middle inter-bold-mineral-green-18px">
                    {assembly}
                  </div>
                  <img className="arrow-10-2" src={arrow10} alt="Arrow 10" />
                </div>
                <Link to="/informational-model">
                  <div className="frame-2-16">
                    <div className="continue-11 valign-text-middle inter-bold-mineral-green-18px">
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

export default ProcessView;
