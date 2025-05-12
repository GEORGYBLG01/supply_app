import React from "react";
import Toggle from "../Toggle";
import Group102 from "../Group102";
import "./Frame101.css";

function Frame101(props) {
  const {
    className,
    toggleProps,
    group1021Props,
    group1022Props,
    group1023Props,
    group1024Props,
    group1025Props,
  } = props;

  return (
    <div className={`frame-101 ${className || ""}`}>
      <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
      <input
        className="a-quelle-frquence-re subtitel"
        name="aquellefréquencerenouvelezvousvotrestock"
        placeholder="A quelle fréquence renouvelez vous votre stock?"
        type="text"
      />
      <Group102 line24={group1021Props.line24} className={group1021Props.className} />
      <input
        className="combien-de-temps-en subtitel"
        name="combiendetempsenmoyenneunarticleeffectuedansvotremagazin"
        placeholder="combien de temps en moyenne un article effectue dans votre magazin?"
        type="text"
      />
      <Group102 line24={group1022Props.line24} className={group1022Props.className} />
      <input
        className="vous subtitel"
        name="vousarrive-t-ildavoirdesrupturesdestocksiouiàquellefréquence"
        placeholder="Vous arrive-t-il d’avoir des ruptures de stock? Si oui, à quelle fréquence?"
        type="text"
      />
      <Group102 line24={group1023Props.line24} className={group1023Props.className} />
      <input
        className="vous subtitel"
        name="avezvousmisenplacedemesuresdamélioration"
        placeholder="Avez vous mis en place de mesures d’amélioration?"
        type="text"
      />
      <Group102 line24={group1024Props.line24} className={group1024Props.className} />
      <input
        className="x subtitel"
        name="*******************************************"
        placeholder="*******************************************"
        type="text"
      />
      <Group102 line24={group1025Props.line24} className={group1025Props.className} />
    </div>
  );
}

export default Frame101;
