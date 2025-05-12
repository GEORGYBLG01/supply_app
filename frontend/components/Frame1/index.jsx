import React from "react";
import "./Frame1.css";

function Frame1(props) {
  const { src, className } = props;

  return (
    <div className={`frame-5-1 ${className || ""}`}>
      <img className="unsplashym-m-sbz0ro" src={src} alt="unsplash:ym--mSBZ0ro" />
    </div>
  );
}

export default Frame1;
