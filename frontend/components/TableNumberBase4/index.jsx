import React from "react";
import "./TableNumberBase4.css";

function TableNumberBase4(props) {
  const { bottomLine, leftLine, rightLine, className } = props;

  return (
    <div className={`table-number-base-6-1 ${className || ""}`}>
      <div className="overlap-group1-8">
        <div className="field-6">
          <div className="type valign-text-middle ibmplexmono-normal-mineral-green-14px">properties</div>
          <div className="null-4 valign-text-middle ibmplexmono-normal-black-14px hidden">NULL</div>
        </div>
        <div className="line-container-6">
          <img className="bottom-line-6" src={bottomLine} alt="Bottom Line" />
          <img className="left-line-6" src={leftLine} alt="Left Line" />
          <img className="right-line-6" src={rightLine} alt="Right Line" />
        </div>
      </div>
    </div>
  );
}

export default TableNumberBase4;
