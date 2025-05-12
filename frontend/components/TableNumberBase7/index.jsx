import React from "react";
import Key from "../Key";
import "./TableNumberBase7.css";

function TableNumberBase7(props) {
  const { keyProps } = props;

  return (
    <div className="table-number-base-14">
      <div className="overlap-group1-13">
        <div className="field-12">
          <div className="name valign-text-middle ibmplexmono-normal-black-10px"></div>
          <div className="type-5 valign-text-middle ibmplexmono-normal-chilean-fire-14px">period:datetime</div>
          <div className="null-8 valign-text-middle ibmplexmono-normal-black-14px hidden">NULL</div>
          <Key className={keyProps.className} />
        </div>
        <div className="line-container-12">
          <img className="bottom-line-12" src="/img/bottom-line-1@2x.png" alt="Bottom Line" />
          <img className="left-line-12" src="/img/left-line-1@2x.png" alt="Left Line" />
          <img className="right-line-12" src="/img/right-line-1@2x.png" alt="Right Line" />
        </div>
      </div>
    </div>
  );
}

export default TableNumberBase7;
