import React from "react";
import { Link } from "react-router-dom";
import Frame94 from "../Frame94";
import Frame95 from "../Frame95";
import "./Connexion.css";

function Connexion(props) {
  const { polygon3, aerialViewContainerCargoShipSea1, subtract, polygon1, polygon2, login1, login2, frame126 } = props;

  

  return (
    <div className="container-center-horizontal">
      <form className="connexion screen" name="form3" action="form3" method="post">
        <div className="overlap-group4">
          <img className="polygon-3" src={polygon3} alt="Polygon 3" />
          <div className="frame-129">
            <img
              className="aerial-view-container-cargo-ship-sea-1"
              src={aerialViewContainerCargoShipSea1}
              alt="aerial-view-container-cargo-ship-sea 1"
            />
          </div>
          <div className="ellipse-1"></div>
          <div className="ellipse-2"></div>
          <img className="subtract" src={subtract} alt="Subtract" />
          <div className="frame-127">
            <img className="polygon-1" src={polygon1} alt="Polygon 1" />
          </div>
          <div className="frame-128">
            <img className="polygon-2" src={polygon2} alt="Polygon 2" />
          </div>
          <a href="javascript:SubmitForm('form3')">
            <div className="group-88">
              <div className="overlap-group">
                <a href="javascript:SubmitForm('form3')">
                  <div className="frame-1"></div>
                </a>
                <Link to="/home">
                  <div className="login valign-text-middle inter-extra-bold-bone-13px">{login1}</div>
                </Link>
              </div>
            </div>
          </a>
          <div className="overlap-group1">
            <a href="javascript:SubmitForm('form3')">
              <div className="frame-2"></div>
            </a>
            <Link to="/inscription">
              <p className="login valign-text-middle inter-extra-bold-bone-13px">{login2}</p>
            </Link>
          </div>
          <div className="frame-126" style={{ backgroundImage: `url(${frame126})` }}></div>
          <Frame94 />
          <Frame95 />
        </div>
      </form>
    </div>
  );
}

export default Connexion;
