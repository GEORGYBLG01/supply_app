import React from "react";
import "./TableNumberBase.css";

function TableNumberBase() {
  return (
    <div className="table-number-base">
      <div className="overlap-group1-2">
        <div className="field">
          <div className="null valign-text-middle ibmplexmono-normal-black-14px hidden">NULL</div>
        </div>
        <div className="line-container">
          <img className="bottom-line" src="/img/bottom-line-15@2x.png" alt="Bottom Line" />
          <img className="left-line" src="/img/left-line-15@2x.png" alt="Left Line" />
          <img className="right-line" src="/img/right-line-15@2x.png" alt="Right Line" />
        </div>
      </div>
    </div>
  );
}

export default TableNumberBase;
