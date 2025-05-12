import React from "react";
import TableNumberBase5 from "../TableNumberBase5";
import "./TableTextBase2.css";

function TableTextBase2(props) {
  const { className, tableNumberBase5Props } = props;

  return (
    <div className={`table-text-base-2-1 ${className || ""}`}>
      <TableNumberBase5
        type={tableNumberBase5Props.type}
        bottomLine={tableNumberBase5Props.bottomLine}
        leftLine={tableNumberBase5Props.leftLine}
        rightLine={tableNumberBase5Props.rightLine}
        className={tableNumberBase5Props.className}
        keyProps={tableNumberBase5Props.keyProps}
      />
    </div>
  );
}

export default TableTextBase2;
