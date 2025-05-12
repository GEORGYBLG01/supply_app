import React from "react";
import "./Key.css";

function Key(props) {
  const { className } = props;

  return (
    <div className={`key hidden ${className || ""}`}>
      <div className="field-extra valign-text-middle ibmplexmono-semi-bold-black-10px">PK</div>
    </div>
  );
}

export default Key;
