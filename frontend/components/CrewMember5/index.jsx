import React from "react";
import TableHeader from "../TableHeader";
import TableNumberPrimaryKey2 from "../TableNumberPrimaryKey2";
import TableTextBase2 from "../TableTextBase2";
import TableTextBaseNull2 from "../TableTextBaseNull2";
import "./CrewMember5.css";

function CrewMember5(props) {
  const { tableHeaderProps, tableNumberPrimaryKey2Props, tableTextBase2Props, tableTextBaseNull2Props } = props;

  return (
    <div className="crew-member-9">
      <div className="table-container-9">
        <TableHeader className={tableHeaderProps.className}>{tableHeaderProps.children}</TableHeader>
        <TableNumberPrimaryKey2 tableNumberBase4Props={tableNumberPrimaryKey2Props.tableNumberBase4Props} />
      </div>
      <TableTextBase2
        className={tableTextBase2Props.className}
        tableNumberBase5Props={tableTextBase2Props.tableNumberBase5Props}
      />
      <TableTextBaseNull2
        className={tableTextBaseNull2Props.className}
        tableNumberBaseNull2Props={tableTextBaseNull2Props.tableNumberBaseNull2Props}
      />
    </div>
  );
}

export default CrewMember5;
