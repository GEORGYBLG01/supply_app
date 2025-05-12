import React from "react";
import Frame42 from "../Frame42";
import Frame43 from "../Frame43";
import "./Ouinon2.css";

function Ouinon2(props) {
  const { className, frame42Props, frame43Props } = props;

  return (
    <div className={`ouinon-48 ${className || ""}`}>
      <Frame42 className={frame42Props.className} />
      <Frame43 className={frame43Props.className} />
    </div>
  );
}

export default Ouinon2;
