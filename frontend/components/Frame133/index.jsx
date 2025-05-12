import React from "react";
import Frame136 from "../Frame136";
import "./Frame133.css";

function Frame133(props) {
  const { className, frame136Props } = props;

  return (
    <div className={`frame-152 ${className || ""}`}>
      <Frame136 className={frame136Props.className} ouinonProps={frame136Props.ouinonProps} />
    </div>
  );
}

export default Frame133;
