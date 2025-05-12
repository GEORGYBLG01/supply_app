import React from "react";
import Key from "../Key";
import "./TableNumberBase2.css";

function TableNumberBase2() {
  return (
    <div className="table-number-base-2">
      <div className="overlap-group1-4">
        <div className="field-2">
          <div className="null-2 valign-text-middle ibmplexmono-normal-black-14px hidden">NULL</div>
          <Key />
        </div>
        <div className="line-container-2">
          <img className="bottom-line-2" src="/img/bottom-line-16@2x.png" alt="Bottom Line" />
          <img className="left-line-2" src="/img/left-line-16@2x.png" alt="Left Line" />
          <img className="right-line-2" src="/img/right-line-16@2x.png" alt="Right Line" />
        </div>
      </div>
    </div>
  );
}

export default TableNumberBase2;
