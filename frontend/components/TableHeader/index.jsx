import React from "react";
import "./TableHeader.css";

function TableHeader(props) {
  const { children, className } = props;

  return (
    <div className={`table-header-2 ${className || ""}`}>
      <div className="table-name-2 valign-text-middle worksans-semi-bold-white-16px">{children}</div>
    </div>
  );
}

export default TableHeader;
