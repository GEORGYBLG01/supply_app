import React from "react";
import Key from "../Key";
import "./TableNumberBase8.css";

function TableNumberBase8(props) {
  const { keyProps } = props;

  return (
    <div className="table-number-base-16">
      <div className="overlap-group1-16">
        <div className="field-14">
          <div className="type-8 valign-text-middle ibmplexmono-normal-mineral-green-14px">methods</div>
          <div className="null-10 valign-text-middle ibmplexmono-normal-black-14px"></div>
          <Key className={keyProps.className} />
        </div>
        <div className="line-container-14">
          <img className="bottom-line-14" src="/img/bottom-line-2@2x.png" alt="Bottom Line" />
          <img className="left-line-14" src="/img/left-line-2@2x.png" alt="Left Line" />
          <img className="right-line-14" src="/img/right-line-2@2x.png" alt="Right Line" />
        </div>
      </div>
    </div>
  );
}

export default TableNumberBase8;
