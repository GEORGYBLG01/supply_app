import React from "react";
import "./Avatars.css";

function Avatars(props) {
  const { ellipse83, ellipse81 } = props;

  return (
    <div className="avatars">
      <div className="overlap-group-94">
        <div className="mask-group">
          <img className="ellipse-83" src={ellipse83} alt="Ellipse 83" />
          <img className="ellipse-81" src={ellipse81} alt="Ellipse 81" />
        </div>
        <div className="ellipse-82"></div>
      </div>
    </div>
  );
}

export default Avatars;
