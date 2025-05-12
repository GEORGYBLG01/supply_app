import React from "react";
import Ouinon from "../Ouinon";
import "./Frame136.css";

function Frame136(props) {
  const { className, ouinonProps } = props;

  return (
    <div className={`frame-13-1 ${className || ""}`}>
      <Ouinon yes={ouinonProps.yes} place={ouinonProps.place} />
    </div>
  );
}

export default Frame136;
