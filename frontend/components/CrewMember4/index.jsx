import React from "react";
import TableHeader from "../TableHeader";
import TableNumberPrimaryKey2 from "../TableNumberPrimaryKey2";
import TableTextBase2 from "../TableTextBase2";
import TableTextBaseNull2 from "../TableTextBaseNull2";
import "./CrewMember4.css";

function CrewMember4(props) {
  const { tableHeaderProps, tableNumberPrimaryKey2Props, tableTextBase2Props, tableTextBaseNull2Props } = props;

  return (
    <div className="crew-member-7">
      <div className="table-container-7">
        <TableHeader className={tableHeaderProps.className}>{tableHeaderProps.children}</TableHeader>
        <TableNumberPrimaryKey2 tableNumberBase4Props={tableNumberPrimaryKey2Props.tableNumberBase4Props} />
      </div>
      <div className="table-text-base-container-5">
        <TableTextBase2 tableNumberBase5Props={tableTextBase2Props.tableNumberBase5Props} />
        <TableTextBaseNull2 tableNumberBaseNull2Props={tableTextBaseNull2Props.tableNumberBaseNull2Props} />
      </div>
    </div>
  );
}

export default CrewMember4;
