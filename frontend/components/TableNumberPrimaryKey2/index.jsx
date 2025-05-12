import React from "react";
import TableNumberBase4 from "../TableNumberBase4";
import "./TableNumberPrimaryKey2.css";

function TableNumberPrimaryKey2(props) {
  const { tableNumberBase4Props } = props;

  return (
    <div className="table-number-primary-key-2">
      <TableNumberBase4
        bottomLine={tableNumberBase4Props.bottomLine}
        leftLine={tableNumberBase4Props.leftLine}
        rightLine={tableNumberBase4Props.rightLine}
        className={tableNumberBase4Props.className}
      />
    </div>
  );
}

export default TableNumberPrimaryKey2;
