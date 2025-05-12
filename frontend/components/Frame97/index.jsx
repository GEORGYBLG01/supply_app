import React from "react";
import Toggle from "../Toggle";
import Group102 from "../Group102";
import "./Frame97.css";

function Frame97(props) {
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
    <div className={`frame-97-4 ${className || ""}`}>
      <Toggle className={toggleProps.className} buttonSecondaryProps={toggleProps.buttonSecondaryProps} />
      <input
        className="aprs-combien-de-temp subtitel"
        name="aprèscombiendetempsunemployépeutprétendreàuneaugmentation"
        placeholder="Après combien de temps un employé peut prétendre à une augmentation?"
        type="text"
      />
      <Group102 line24={group1021Props.line24} className={group1021Props.className} />
      <input
        className="x-de subtitel"
        name="queltypederecrutementprivilégiezvousinterneouexterne"
        placeholder="Quel type de recrutement privilégiez vous? Interne ou externe"
        type="text"
      />
      <Group102 line24={group1022Props.line24} className={group1022Props.className} />
      <input
        className="x-de subtitel"
        name="arbitrezvousdefaçonéquilibréeentrelesbesoinsdelorganisationetceuxdespartiesprenantes"
        placeholder="Arbitrez vous de façon équilibrée entre les besoins de l’organisation et ceux des parties prenantes?"
        type="text"
      />
      <Group102 line24={group1023Props.line24} className={group1023Props.className} />
      <input
        className="accompagnez-vous-les subtitel"
        name="accompagnezvouslestravailleursquiveulentmonterleurpropreorganisation"
        placeholder="Accompagnez vous les travailleurs qui veulent monter leur propre organisation?"
        type="text"
      />
      <Group102 line24={group1024Props.line24} className={group1024Props.className} />
      <input
        className="quel-est-le-turnover subtitel"
        name="quelestleturnoverdelentreprisepluselleestgrandemoinslesemployésrestent"
        placeholder="Quel est le turnover de l’entreprise (plus elle est  grande moins les employés restent)?"
        type="text"
      />
      <Group102 line24={group1025Props.line24} className={group1025Props.className} />
    </div>
  );
}

export default Frame97;
