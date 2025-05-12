import React from "react";
import Key from "../Key";
import "./TableNumberBase6.css";

function TableNumberBase6(props) {
  const { bottomLine, leftLine, rightLine, className, keyProps } = props;

  return (
    <div className={`table-number-base-12-1 ${className || ""}`}>
      <div className="overlap-group1-11">
        <div className="field-10">
          <div className="type-2 valign-text-middle ibmplexmono-normal-mineral-green-14px">methods</div>
          <Key className={keyProps.className} />
        </div>
        <div className="line-container-10">
          <img className="bottom-line-10" src={bottomLine} alt="Bottom Line" />
          <img className="left-line-10" src={leftLine} alt="Left Line" />
          <img className="right-line-10" src={rightLine} alt="Right Line" />
        </div>
      </div>
    </div>
  );
}

export default TableNumberBase6;
