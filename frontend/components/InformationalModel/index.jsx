import React from "react";
import { Link } from "react-router-dom";
import Frame11332 from "../Frame11332";
import Frame114 from "../Frame114";
import Frame115 from "../Frame115";
import Frame116 from "../Frame116";
import Frame11322 from "../Frame11322";
import NavItems452 from "../NavItems452";
import TableHeader from "../TableHeader";
import TableNumberPrimaryKey from "../TableNumberPrimaryKey";
import TableTextBase from "../TableTextBase";
import TableTextBaseNull from "../TableTextBaseNull";
import CrewMember from "../CrewMember";
import CrewMember2 from "../CrewMember2";
import CrewMember3 from "../CrewMember3";
import CrewMember4 from "../CrewMember4";
import CrewMember5 from "../CrewMember5";
import "./InformationalModel.css";

function InformationalModel(props) {
  const {
    x1200PxLogo_Icam__20081,
    design,
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
    nextStep,
    navItems452Props,
    tableHeaderProps,
    crewMemberProps,
    crewMember2Props,
    crewMember3Props,
    crewMember4Props,
    crewMember5Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="informational-model screen">
        <div className="overlap-group12">
          <div className="flex-row">
            <Link to="/home">
              <img
                className="x1200px-logo_icam_-_2008-1"
                src={x1200PxLogo_Icam__20081}
                alt="1200px-Logo_ICAM_-_2008 1"
              />
            </Link>
            <div className="nav-items-2">
              <Frame11332 />
              <Frame114 />
              <Frame115 />
              <Frame116 />
              <div className="frame-117">
                <div className="design valign-text-middle inter-medium-sonic-silver-18px">
                  {design}
                </div>
              </div>
              <Frame11322 />
            </div>
          </div>
          <NavItems452
            frame1162Props={navItems452Props.frame1162Props}
            frame1172Props={navItems452Props.frame1172Props}
            frame1136Props={navItems452Props.frame1136Props}
          />
        </div>
        <div className="flex-row-1">
          <div className="flex-col inter-medium-rum-swizzle-18-1px">
            <div className="arrow-container">
              <img className="arrow-7" src={arrow7} alt="Arrow 7" />
              <img className="arrow-8" src={arrow8} alt="Arrow 8" />
            </div>
            <div className="crew-member">
              <div className="table-container">
                <TableHeader>{tableHeaderProps.children}</TableHeader>
                <TableNumberPrimaryKey />
              </div>
              <div className="table-text-base-container">
                <TableTextBase />
                <TableTextBaseNull />
              </div>
            </div>
            <div className="frame-5">
              <img className="line-3" src={line31} alt="Line 3" />
              <img className="line-4" src={line4} alt="Line 4" />
            </div>
            <div className="frame-8"></div>
            <div className="overlap-group14">
              <img className="line-2" src={line2} alt="Line 2" />
              <div className="ellipse-86"></div>
            </div>
            <div className="label">{label1}</div>
            <img className="text-format" src={textFormat} alt="Text format" />
            <div className="label-1">{label2}</div>
          </div>
          <div className="flex-row-2">
            <img className="line-1" src={line1} alt="Line 1" />
            <div className="flex-col-1">
              <div className="flex-row-3">
                <Link to="/process-view" className="align-self-flex-end">
                  <div className="frame-10">
                    <div className="place valign-text-middle inter-bold-tropical-rain-forest-18px">
                      {place}
                    </div>
                  </div>
                </Link>
                <p className="click-on-modeling valign-text-middle bevan-normal-white-20px">
                  {clickOnModeling}
                </p>
              </div>
              <div className="overlap-group16">
                <div className="overlap-group13">
                  <div className="frame-6"></div>
                  <div className="frame-7"></div>
                  <CrewMember
                    tableHeaderProps={crewMemberProps.tableHeaderProps}
                    tableNumberPrimaryKey2Props={
                      crewMemberProps.tableNumberPrimaryKey2Props
                    }
                    tableTextBase2Props={crewMemberProps.tableTextBase2Props}
                    tableTextBaseNull2Props={
                      crewMemberProps.tableTextBaseNull2Props
                    }
                  />
                  <CrewMember2
                    tableHeaderProps={crewMember2Props.tableHeaderProps}
                    tableNumberPrimaryKey2Props={
                      crewMember2Props.tableNumberPrimaryKey2Props
                    }
                    tableTextBase3Props={crewMember2Props.tableTextBase3Props}
                    tableTextBaseNull2Props={
                      crewMember2Props.tableTextBaseNull2Props
                    }
                  />
                  <CrewMember3
                    tableHeaderProps={crewMember3Props.tableHeaderProps}
                    tableNumberPrimaryKey2Props={
                      crewMember3Props.tableNumberPrimaryKey2Props
                    }
                    tableTextBase2Props={crewMember3Props.tableTextBase2Props}
                    tableTextBaseNull3Props={
                      crewMember3Props.tableTextBaseNull3Props
                    }
                  />
                  <CrewMember4
                    tableHeaderProps={crewMember4Props.tableHeaderProps}
                    tableNumberPrimaryKey2Props={
                      crewMember4Props.tableNumberPrimaryKey2Props
                    }
                    tableTextBase2Props={crewMember4Props.tableTextBase2Props}
                    tableTextBaseNull2Props={
                      crewMember4Props.tableTextBaseNull2Props
                    }
                  />
                  <img className="arrow-1" src={arrow1} alt="Arrow 1" />
                  <img className="arrow-2" src={arrow2} alt="Arrow 2" />
                  <img className="line-3-1" src={line32} alt="Line 3" />
                </div>
                <CrewMember5
                  tableHeaderProps={crewMember5Props.tableHeaderProps}
                  tableNumberPrimaryKey2Props={
                    crewMember5Props.tableNumberPrimaryKey2Props
                  }
                  tableTextBase2Props={crewMember5Props.tableTextBase2Props}
                  tableTextBaseNull2Props={
                    crewMember5Props.tableTextBaseNull2Props
                  }
                />
                <img className="arrow-5" src={arrow5} alt="Arrow 5" />
                <img className="arrow-6" src={arrow6} alt="Arrow 6" />
              </div>
              <div className="frame-container">
                <a href="https://app.diagrams.net/" target="_blank">
                  <div className="frame-11">
                    <div className="modeling valign-text-middle inter-bold-tropical-rain-forest-18px">
                      {modeling}
                    </div>
                  </div>
                </a>
                <Link to="/lean-vsm">
                  <div className="frame-9">
                    <div className="next-step valign-text-middle inter-bold-mineral-green-18px">
                      {nextStep}
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

export default InformationalModel;
