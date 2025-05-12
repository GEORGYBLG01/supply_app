import React from "react";
import Key from "../Key";
import "./TableNumberBase5.css";

function TableNumberBase5(props) {
  const { type, bottomLine, leftLine, rightLine, className, keyProps } = props;

  return (
    <div className={`table-number-base-8-1 ${className || ""}`}>
      <div className="overlap-group1-10">
        <div className="field-8">
          <div className="type-4 valign-text-middle ibmplexmono-normal-chilean-fire-14px">{type}</div>
          <div className="null-6 valign-text-middle ibmplexmono-normal-black-14px hidden">NULL</div>
          <Key className={keyProps.className} />
        </div>
        <div className="line-container-8">
          <img className="bottom-line-8" src={bottomLine} alt="Bottom Line" />
          <img className="left-line-8" src={leftLine} alt="Left Line" />
          <img className="right-line-8" src={rightLine} alt="Right Line" />
        </div>
      </div>
    </div>
  );
}

export default TableNumberBase5;
