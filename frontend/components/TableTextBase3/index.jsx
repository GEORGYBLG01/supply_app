import React from "react";
import TableNumberBase7 from "../TableNumberBase7";
import "./TableTextBase3.css";

function TableTextBase3(props) {
  const { tableNumberBase7Props } = props;

  return (
    <div className="table-text-base-8">
      <TableNumberBase7 keyProps={tableNumberBase7Props.keyProps} />
    </div>
  );
}

export default TableTextBase3;
