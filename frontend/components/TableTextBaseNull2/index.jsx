import React from "react";
import TableNumberBaseNull2 from "../TableNumberBaseNull2";
import "./TableTextBaseNull2.css";

function TableTextBaseNull2(props) {
  const { className, tableNumberBaseNull2Props } = props;

  return (
    <div className={`table-text-base-null-2 ${className || ""}`}>
      <TableNumberBaseNull2 tableNumberBase6Props={tableNumberBaseNull2Props.tableNumberBase6Props} />
    </div>
  );
}

export default TableTextBaseNull2;
