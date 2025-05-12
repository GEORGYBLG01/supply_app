import React from "react";
import Toggle from "../Toggle";
import Group102 from "../Group102";
import "./Frame96.css";

function Frame96(props) {
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
    <div className={`frame-96-4 ${className || ""}`}>
      <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
      <input
        className="vos-employs-sont-ils-1 subtitel"
        name="vosemployéssont-ilsforcedepropositionsconcernantlesinnovations"
        placeholder="Vos employés sont-ils force de propositions concernant les innovations?"
        type="text"
      />
      <Group102 line24={group1021Props.line24} />
      <input
        className="avez-vous-un-managem-1 subtitel"
        name="avezvousunmanagementquifavoriselcréativitédessalariés"
        placeholder="Avez vous un management qui favorise l créativité des salariés?"
        type="text"
      />
      <Group102 line24={group1022Props.line24} />
      <input
        className="sez-vous-1 subtitel"
        name="garantissezvouslégalitédeschancesdetouslestravailleurscomment"
        placeholder="Garantissez vous l’égalité des chances de tous les travailleurs? Comment?"
        type="text"
      />
      <Group102 line24={group1023Props.line24} className={group1023Props.className} />
      <input
        className="sez-vous-1 subtitel"
        name="quelmanagementutilisezvous"
        placeholder="Quel management utilisez vous?"
        type="text"
      />
      <Group102 line24={group1024Props.line24} className={group1024Props.className} />
      <input
        className="est-ce-que-les-journ-1 subtitel"
        name="est-cequelesjournéesdetravailsontadaptéesauvolumedetravail"
        placeholder="Est-ce que les journées de travail sont adaptées au volume de travail?"
        type="text"
      />
      <Group102 line24={group1025Props.line24} className={group1025Props.className} />
    </div>
  );
}

export default Frame96;
