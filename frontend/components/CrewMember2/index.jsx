import React from "react";
import TableHeader from "../TableHeader";
import TableNumberPrimaryKey2 from "../TableNumberPrimaryKey2";
import TableTextBase3 from "../TableTextBase3";
import TableTextBaseNull2 from "../TableTextBaseNull2";
import "./CrewMember2.css";

function CrewMember2(props) {
  const { tableHeaderProps, tableNumberPrimaryKey2Props, tableTextBase3Props, tableTextBaseNull2Props } = props;

  return (
    <div className="crew-member-3">
      <div className="table-container-3">
        <TableHeader className={tableHeaderProps.className}>{tableHeaderProps.children}</TableHeader>
        <TableNumberPrimaryKey2 tableNumberBase4Props={tableNumberPrimaryKey2Props.tableNumberBase4Props} />
      </div>
      <div className="table-text-base-container-3">
        <TableTextBase3 tableNumberBase7Props={tableTextBase3Props.tableNumberBase7Props} />
        <TableTextBaseNull2 tableNumberBaseNull2Props={tableTextBaseNull2Props.tableNumberBaseNull2Props} />
      </div>
    </div>
  );
}

export default CrewMember2;
