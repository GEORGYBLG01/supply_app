import React from "react";
import TableHeader from "../TableHeader";
import TableNumberPrimaryKey2 from "../TableNumberPrimaryKey2";
import TableTextBase2 from "../TableTextBase2";
import TableTextBaseNull3 from "../TableTextBaseNull3";
import "./CrewMember3.css";

function CrewMember3(props) {
  const { tableHeaderProps, tableNumberPrimaryKey2Props, tableTextBase2Props, tableTextBaseNull3Props } = props;

  return (
    <div className="crew-member-5">
      <div className="table-container-5">
        <TableHeader className={tableHeaderProps.className}>{tableHeaderProps.children}</TableHeader>
        <TableNumberPrimaryKey2 tableNumberBase4Props={tableNumberPrimaryKey2Props.tableNumberBase4Props} />
      </div>
      <TableTextBase2
        className={tableTextBase2Props.className}
        tableNumberBase5Props={tableTextBase2Props.tableNumberBase5Props}
      />
      <TableTextBaseNull3 tableNumberBaseNull3Props={tableTextBaseNull3Props.tableNumberBaseNull3Props} />
    </div>
  );
}

export default CrewMember3;
