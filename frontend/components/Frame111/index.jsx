import React from "react";
import Toggle from "../Toggle";
import Ouinon from "../Ouinon";
import "./Frame111.css";

function Frame111(props) {
  const {
    toggle1Props,
    ouinon1Props,
    ouinon2Props,
    ouinon3Props,
    toggle2Props,
    ouinon4Props,
    ouinon5Props,
    toggle3Props,
    ouinon6Props,
    ouinon7Props,
    ouinon8Props,
    ouinon9Props,
  } = props;

  return (
    <div className="frame-111">
      <div className="developpement-et-capital-humain-3">
        <Toggle className={toggle1Props.className} buttonSecondaryProps={toggle1Props.buttonSecondaryProps} />
        <textarea
          className="do-you-1 subtitel"
          name="doyouensurethattheprocessesproductsandservicesprovidedbyexternalproviderscomplywiththeorganisationsrequirements"
          placeholder="Connaissez vous votre bilan carbone?"
          type="text"
        ></textarea>
        <Ouinon place={ouinon1Props.place} yes={ouinon1Props.yes} className={ouinon1Props.className} />
        <textarea
          className="do-you-1 subtitel"
          name="doyouconsiderthepotentialimpactofexternalserviceprovidersontheorganisationsabilitytoconsistentlymeetcustomerlegalandregulatoryrequirements"
          placeholder="Connaissez vous votre bilan carbone?"
          type="text"
        ></textarea>
        <Ouinon place={ouinon2Props.place} yes={ouinon2Props.yes} className={ouinon2Props.className} />
        <textarea
          className="do-you-1 subtitel"
          name="doyouevaluatetheservicesprovidedbyexternalproviders"
          placeholder="Connaissez vous votre bilan carbone?"
          type="text"
        ></textarea>
        <Ouinon place={ouinon3Props.place} yes={ouinon3Props.yes} className={ouinon3Props.className} />
      </div>
      <div className="developpement-et-capital-humain-4">
        <Toggle className={toggle2Props.className} buttonSecondaryProps={toggle2Props.buttonSecondaryProps} />
        <textarea
          className="do-you-2 subtitel"
          name="doyouapplycriteriaforevaluatingselectingmonitoringtheperformanceofexternalproviders"
          placeholder="Connaissez vous votre bilan carbone?"
          type="text"
        ></textarea>
        <Ouinon place={ouinon4Props.place} yes={ouinon4Props.yes} className={ouinon4Props.className} />
        <textarea
          className="do-you-2 subtitel"
          name="doyoukeepdocumentedinformationabouttheseactivitiesandanynecessaryactions"
          placeholder="Connaissez vous votre bilan carbone?"
          type="text"
        ></textarea>
        <Ouinon place={ouinon5Props.place} yes={ouinon5Props.yes} className={ouinon5Props.className} />
      </div>
      <div className="developpement-et-capital-humain-5">
        <Toggle className={toggle3Props.className} buttonSecondaryProps={toggle3Props.buttonSecondaryProps} />
        <textarea
          className="have-you-determined subtitel"
          name="haveyoudeterminedtherequiredinputsandexpectedoutputsfortheseprocesses"
          placeholder="Connaissez vous votre bilan carbone?"
          type="text"
        ></textarea>
        <Ouinon place={ouinon6Props.place} yes={ouinon6Props.yes} className={ouinon6Props.className} />
        <textarea
          className="x-you-1 subtitel"
          name="haveyouassignedresponsibilitiesandauthoritiesfortheseprocesses"
          placeholder="Connaissez vous votre bilan carbone?"
          type="text"
        ></textarea>
        <Ouinon place={ouinon7Props.place} yes={ouinon7Props.yes} className={ouinon7Props.className} />
        <textarea
          className="x-you-1 subtitel"
          name="haveyoudeterminedtheresourcesneededfortheseprocessesandensuredtheiravailability"
          placeholder="Connaissez vous votre bilan carbone?"
          type="text"
        ></textarea>
        <Ouinon place={ouinon8Props.place} yes={ouinon8Props.yes} className={ouinon8Props.className} />
        <textarea
          className="x-you-1 subtitel"
          name="doyoudetermineandapplythecriteriaandmethodsnecessarytoensuretheeffectiveoperationandcontroloftheseprocesses"
          placeholder="Connaissez vous votre bilan carbone?"
          type="text"
        ></textarea>
        <Ouinon place={ouinon9Props.place} yes={ouinon9Props.yes} className={ouinon9Props.className} />
      </div>
    </div>
  );
}

export default Frame111;
