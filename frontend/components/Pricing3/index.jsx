import React from "react";
import "./Pricing3.css";

function Pricing3(props) {
  const { cost, className } = props;

  return (
    <div className={`pricing-3 ${className || ""}`}>
      <div className="cost inter-bold-rum-swizzle-24px">{cost}</div>
      <label className="x25-4 inter-bold-rum-swizzle-56px" htmlFor="25">/25</label>
      <img className="line-21-2" src="/img/line-21-1@2x.png" alt="Line 21" />
    </div>
  );
}

export default Pricing3;
