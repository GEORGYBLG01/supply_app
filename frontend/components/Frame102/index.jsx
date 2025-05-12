import React from "react";
import Toggle from "../Toggle";
import Group102 from "../Group102";
import "./Frame102.css";

function Frame102(props) {
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
    <div className={`frame-102 ${className || ""}`}>
      <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
      <input
        className="dans-quel-rayon-se-situe-vos-clients subtitel"
        name="dansquelrayonsesituevosclients"
        placeholder="Dans quel rayon se situe vos clients?"
        type="text"
      />
      <Group102 line24={group1021Props.line24} className={group1021Props.className} />
      <input
        className="quel subtitel"
        name="aquellefréquenceeffectuezvousdeslivraisons"
        placeholder="A quelle fréquence effectuez vous des livraisons?"
        type="text"
      />
      <Group102 line24={group1022Props.line24} className={group1022Props.className} />
      <input
        className="quel subtitel"
        name="quelestvotretauxdeservice"
        placeholder="Quel est votre taux de service?"
        type="text"
      />
      <Group102 line24={group1023Props.line24} className={group1023Props.className} />
      <input
        className="quel-est-votre-taux-de-retard subtitel"
        name="quelestvotretauxderetard"
        placeholder="Quel est votre taux de retard?"
        type="text"
      />
      <Group102 line24={group1024Props.line24} className={group1024Props.className} />
      <input
        className="x-9 subtitel"
        name="*************************************"
        placeholder="*************************************"
        type="text"
      />
      <Group102 line24={group1025Props.line24} className={group1025Props.className} />
    </div>
  );
}

export default Frame102;
