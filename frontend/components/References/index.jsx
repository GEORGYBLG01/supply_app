import React from "react";
import { Link, useHistory } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame117 from "../Frame117";
import Frame1142 from "../Frame1142";
import Frame11532 from "../Frame11532";
import Frame11322 from "../Frame11322";
import "./References.css";
import { e_sum } from "../Environmental5";
import { s_sum } from "../Social6";
import { m_sum } from "../Modernization4";

function References(props) {
  const {
    resultsPropositions,
    label1,
    label2,
    x1200PxLogo_Icam__20081,
    inputType1,
    inputPlaceholder1,
    tracbility,
    place1,
    vector371,
    vector372,
    vector38,
    product,
    validation,
    iso9001Isf,
    vector373,
    processValidation,
    line211,
    cost,
    inputType2,
    inputPlaceholder2,
    line212,
    vector374,
    vector375,
    vector376,
    vector377,
    transportCost,
    manufacturingCost,
    deliveryCost,
    exportCost,
    modernisation,
    inputType3,
    inputPlaceholder3,
    line213,
    vector378,
    vector379,
    vector3710,
    vector3711,
    supplyChain40,
    informationSystem,
    ergonomics,
    newTechnologiesAiRoboticsEtc,
    leadTime,
    inputType4,
    inputPlaceholder4,
    line214,
    vector3712,
    vector3713,
    vector3714,
    manufacturingTime,
    deliveryTime,
    storageTime,
    place2,
    propositions,
    frame11332Props,
    frame117Props,
    frame1142Props,
    frame11322Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="references screen">
        <div className="overlap-group9-4">
          <div className="overlap-group8-3">
            <div className="rectangle-2-2"></div>
            <div className="nav-items-2-55">
              <Frame11332 className={frame11332Props.className} />
              <Frame114 />
              <Frame115 />
              <div className="frame-116-180">
                <div className="results-propositions valign-text-middle inter-medium-white-18px">
                  {resultsPropositions}
                </div>
              </div>
              <Frame117 className={frame117Props.className} />
            </div>
            <div className="nav-items-3-79">
              <Frame1142 className={frame1142Props.className} />
              <Frame11532 />
              <Link to="/existing-case">
                <div className="label-167 inter-medium-star-dust-18-1px">{label1}</div>
              </Link>
              <Link to="/cur-performance">
                <div className="label-167 inter-medium-sonic-silver-18-1px">{label2}</div>
              </Link>
              <Frame11322 className={frame11322Props.className} />
            </div>
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-87"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="frame-3-7"></div>
            <div className="overlap-group4-18">
              <div className="rectangle-4359"></div>
              <label
                className="x25-22 inter-bold-mineral-green-56px"
                htmlFor="25"
              >
                  {e_sum}/35
              </label>
              <div className="tracbility valign-text-middle inter-medium-black-14px">{tracbility}</div>
              <h1 className="place-271 inter-bold-mineral-green-24px">{place1}</h1>
              <div className="pricing-features">
                <div className="overlap-group-container-16">
                  <div className="overlap-group1-52">
                    <img className="vector-3" src={vector371} alt="Vector 37" />
                  </div>
                  <div className="overlap-group2-26">
                    <img className="vector-3" src={vector372} alt="Vector 37" />
                  </div>
                  <div className="overlap-group3-24">
                    <img className="vector-3" src={vector38} alt="Vector 38" />
                  </div>
                </div>
                <div className="flex-col-105 inter-medium-black-14px">
                  <div className="product valign-text-middle">{product}</div>
                  <div className="validation valign-text-middle">{validation}</div>
                  <div className="iso-9001-isf valign-text-middle">{iso9001Isf}</div>
                  <div className="overlap-group-90">
                    <img className="vector-37" src={vector373} alt="Vector 37" />
                    <div className="process-validation valign-text-middle inter-medium-black-14px">
                      {processValidation}
                    </div>
                  </div>
                </div>
              </div>
              <img className="line-21-9" src={line211} alt="Line 21" />
            </div>
            <div className="frame-6-14"></div>
          </div>
          <div className="overlap-group5-15">
            <div className="cost-3 inter-bold-rum-swizzle-24px">{cost}</div>
            <label
              className="x25-23 inter-bold-rum-swizzle-56px"
              htmlFor="25"
            >
                  {s_sum}/38
            </label>
            <img className="line-21-10" src={line212} alt="Line 21" />
            <div className="pricing-features-1">
              <div className="overlap-group-container-17">
                <div className="overlap-group-87">
                  <img className="vector-3" src={vector374} alt="Vector 37" />
                </div>
                <div className="overlap-group-88">
                  <img className="vector-3" src={vector375} alt="Vector 37" />
                </div>
                <div className="overlap-group-87">
                  <img className="vector-3" src={vector376} alt="Vector 37" />
                </div>
                <div className="overlap-group-88">
                  <img className="vector-3" src={vector377} alt="Vector 37" />
                </div>
              </div>
              <div className="cost-container inter-medium-rum-swizzle-14px">
                <div className="transport-cost valign-text-middle">{transportCost}</div>
                <div className="manufacturing-cost valign-text-middle">{manufacturingCost}</div>
                <div className="delivery-cost valign-text-middle">{deliveryCost}</div>
                <div className="export-cost valign-text-middle">{exportCost}</div>
              </div>
            </div>
          </div>
          <div className="overlap-group6-7">
            <div className="modernisation inter-bold-rum-swizzle-24px">{modernisation}</div>
            <label
              className="x25-24 inter-bold-rum-swizzle-56px"
              htmlFor="25"
              
            >
              {m_sum}/26
            </label>
            <img className="line-21-11" src={line213} alt="Line 21" />
            <div className="pricing-features-2">
              <div className="overlap-group-container-18">
                <div className="overlap-group-87">
                  <img className="vector-3" src={vector378} alt="Vector 37" />
                </div>
                <div className="overlap-group-88">
                  <img className="vector-3" src={vector379} alt="Vector 37" />
                </div>
                <div className="overlap-group-87">
                  <img className="vector-3" src={vector3710} alt="Vector 37" />
                </div>
                <div className="overlap-group-88">
                  <img className="vector-3" src={vector3711} alt="Vector 37" />
                </div>
              </div>
              <div className="flex-col-106 inter-medium-rum-swizzle-14px">
                <div className="supply-chain-40 valign-text-middle">{supplyChain40}</div>
                <div className="flex-col-item valign-text-middle">{informationSystem}</div>
                <div className="flex-col-item valign-text-middle">{ergonomics}</div>
                <p className="new-technologies-ai-robotics-etc valign-text-middle">{newTechnologiesAiRoboticsEtc}</p>
              </div>
            </div>
          </div>
          <div className="overlap-group7-5">
            <div className="lead-time-4 inter-bold-mineral-green-24px">{leadTime}</div>
            <textarea
              className="x25-25 inter-bold-mineral-green-56px"
              name="25"
              placeholder={inputPlaceholder4}
              type={inputType4}
            ></textarea>
            <img className="line-21-12" src={line214} alt="Line 21" />
            <div className="pricing-features-3">
              <div className="overlap-group-container-19">
                <div className="overlap-group2-27">
                  <img className="vector-3" src={vector3712} alt="Vector 37" />
                </div>
                <div className="overlap-group-89">
                  <img className="vector-3" src={vector3713} alt="Vector 37" />
                </div>
                <div className="overlap-group-89">
                  <img className="vector-3" src={vector3714} alt="Vector 37" />
                </div>
              </div>
              <div className="time-container inter-medium-black-14px">
                <div className="manufacturing-time valign-text-middle">{manufacturingTime}</div>
                <div className="delivery-time valign-text-middle">{deliveryTime}</div>
                <div className="storage-time valign-text-middle">{storageTime}</div>
              </div>
            </div>
          </div>
          <Link to="/">
            <div className="frame-5-24">
              <div className="place-272 valign-text-middle inter-bold-tropical-rain-forest-18px">{place2}</div>
            </div>
          </Link>
        </div>
        <Link to="/objectives">
          <div className="frame-2-30">
            <div className="propositions-1 valign-text-middle inter-bold-tropical-rain-forest-18px">{propositions}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default References;
