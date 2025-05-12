import React from "react";
import TableNumberBase6 from "../TableNumberBase6";
import "./TableNumberBaseNull2.css";

function TableNumberBaseNull2(props) {
  const { tableNumberBase6Props } = props;

  return (
    <div className="table-number-base-null-2">
      <TableNumberBase6
        bottomLine={tableNumberBase6Props.bottomLine}
        leftLine={tableNumberBase6Props.leftLine}
        rightLine={tableNumberBase6Props.rightLine}
        className={tableNumberBase6Props.className}
        keyProps={tableNumberBase6Props.keyProps}
      />
    </div>
  );
}

export default TableNumberBaseNull2;
