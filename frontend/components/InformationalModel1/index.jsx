import React from "react";
import { Link } from "react-router-dom";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame117 from "../Frame117";
import Frame11322 from "../Frame11322";
import Frame11632 from "../Frame11632";
import Frame11622 from "../Frame11622";
import Frame11722 from "../Frame11722";
import Frame1136 from "../Frame1136";
import Frame11342 from "../Frame11342";
import TableHeader from "../TableHeader";
import TableNumberPrimaryKey from "../TableNumberPrimaryKey";
import TableTextBase from "../TableTextBase";
import TableTextBaseNull from "../TableTextBaseNull";
import CrewMember from "../CrewMember";
import CrewMember2 from "../CrewMember2";
import CrewMember3 from "../CrewMember3";
import CrewMember4 from "../CrewMember4";
import CrewMember5 from "../CrewMember5";
import "./InformationalModel1.css";

function InformationalModel1(props) {
  const {
    x1200PxLogo_Icam__20081,
    aquisition,
    functionalView,
    arrow7,
    arrow8,
    line31,
    line4,
    line2,
    label1,
    textFormat,
    label2,
    line1,
    place,
    clickOnModeling,
    arrow1,
    arrow2,
    line32,
    arrow5,
    arrow6,
    modeling,
    goOnToTheNextPage,
    frame11622Props,
    frame11722Props,
    frame1136Props,
    tableHeaderProps,
    crewMemberProps,
    crewMember2Props,
    crewMember3Props,
    crewMember4Props,
    crewMember5Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="informational-model-1-1 screen">
        <div className="overlap-group15">
          <div className="flex-row-27">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1-8"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-2-11">
              <div className="frame-113-43">
                <div className="aquisition-89 valign-text-middle inter-medium-sonic-silver-18px">{aquisition}</div>
              </div>
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <Frame117 />
              <Frame11322 />
            </div>
          </div>
          <div className="nav-items-4-6">
            <Link to="/functional-view-1">
              <div className="frame-114-94">
                <div className="functional-view-9 valign-text-middle inter-medium-star-dust-18px">{functionalView}</div>
              </div>
            </Link>
            <Frame11632 />
            <Frame11622>{frame11622Props.children}</Frame11622>
            <Frame11722>{frame11722Props.children}</Frame11722>
            <Frame1136>{frame1136Props.children}</Frame1136>
            <Frame11342 />
          </div>
        </div>
        <div className="flex-row-28">
          <div className="flex-col-16 inter-medium-rum-swizzle-18-1px">
            <div className="arrow-container-5">
              <img className="arrow-7-3" src={arrow7} alt="Arrow 7" />
              <img className="arrow-8-4" src={arrow8} alt="Arrow 8" />
            </div>
            <div className="crew-member-11">
              <div className="table-container-11">
                <TableHeader>{tableHeaderProps.children}</TableHeader>
                <TableNumberPrimaryKey />
              </div>
              <div className="table-text-base-container-7">
                <TableTextBase />
                <TableTextBaseNull />
              </div>
            </div>
            <div className="frame-5-8">
              <img className="line-3-3" src={line31} alt="Line 3" />
              <img className="line-4-2" src={line4} alt="Line 4" />
            </div>
            <div className="frame-8-1"></div>
            <div className="overlap-group12-1">
              <img className="line-2-5" src={line2} alt="Line 2" />
              <div className="ellipse-86-5"></div>
            </div>
            <div className="label-31">{label1}</div>
            <img className="text-format-5" src={textFormat} alt="Text format" />
            <div className="label-32">{label2}</div>
          </div>
          <div className="flex-row-29">
            <img className="line-1-5" src={line1} alt="Line 1" />
            <div className="flex-col-17">
              <div className="flex-row-30">
                <Link to="/process-view-1">
                  <div className="frame-11-5">
                    <div className="place-71 valign-text-middle inter-bold-tropical-rain-forest-18px">{place}</div>
                  </div>
                </Link>
                <p className="click-on-modeling-4 valign-text-middle bevan-normal-white-20px">{clickOnModeling}</p>
              </div>
              <div className="overlap-group16-1">
                <div className="overlap-group13-1">
                  <div className="frame-7-1"></div>
                  <CrewMember
                    tableHeaderProps={crewMemberProps.tableHeaderProps}
                    tableNumberPrimaryKey2Props={crewMemberProps.tableNumberPrimaryKey2Props}
                    tableTextBase2Props={crewMemberProps.tableTextBase2Props}
                    tableTextBaseNull2Props={crewMemberProps.tableTextBaseNull2Props}
                  />
                  <CrewMember2
                    tableHeaderProps={crewMember2Props.tableHeaderProps}
                    tableNumberPrimaryKey2Props={crewMember2Props.tableNumberPrimaryKey2Props}
                    tableTextBase3Props={crewMember2Props.tableTextBase3Props}
                    tableTextBaseNull2Props={crewMember2Props.tableTextBaseNull2Props}
                  />
                  <CrewMember3
                    tableHeaderProps={crewMember3Props.tableHeaderProps}
                    tableNumberPrimaryKey2Props={crewMember3Props.tableNumberPrimaryKey2Props}
                    tableTextBase2Props={crewMember3Props.tableTextBase2Props}
                    tableTextBaseNull3Props={crewMember3Props.tableTextBaseNull3Props}
                  />
                  <CrewMember4
                    tableHeaderProps={crewMember4Props.tableHeaderProps}
                    tableNumberPrimaryKey2Props={crewMember4Props.tableNumberPrimaryKey2Props}
                    tableTextBase2Props={crewMember4Props.tableTextBase2Props}
                    tableTextBaseNull2Props={crewMember4Props.tableTextBaseNull2Props}
                  />
                  <img className="arrow-1-4" src={arrow1} alt="Arrow 1" />
                  <img className="arrow-2-4" src={arrow2} alt="Arrow 2" />
                  <img className="line-3-4" src={line32} alt="Line 3" />
                </div>
                <CrewMember5
                  tableHeaderProps={crewMember5Props.tableHeaderProps}
                  tableNumberPrimaryKey2Props={crewMember5Props.tableNumberPrimaryKey2Props}
                  tableTextBase2Props={crewMember5Props.tableTextBase2Props}
                  tableTextBaseNull2Props={crewMember5Props.tableTextBaseNull2Props}
                />
                <img className="arrow-5-3" src={arrow5} alt="Arrow 5" />
                <img className="arrow-6-4" src={arrow6} alt="Arrow 6" />
              </div>
              <div className="frame-container-4">
                <div className="frame-12-1">
                  <a href="https://app.diagrams.net/" target="_blank">
                    <div className="modeling-86 valign-text-middle inter-bold-mineral-green-18px">{modeling}</div>
                  </a>
                </div>
                <Link to={"/lean-vsm-1"}>
                <div className="frame-113-44">
                  <p className="go-on-to-the-next-page valign-text-middle inter-bold-mineral-green-18px">
                    {goOnToTheNextPage}
                  </p>
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

export default InformationalModel1;
