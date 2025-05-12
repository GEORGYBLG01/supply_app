import React from "react";
import HeaderMenuDefault32 from "../HeaderMenuDefault32";
import "./MenuItemDefault.css";

function MenuItemDefault(props) {
  const { headerMenuDefault3Props } = props;

  return (
    <div className="menu-item-default-18">
      <HeaderMenuDefault32
        inputPlaceholder={headerMenuDefault3Props.inputPlaceholder}
        className={headerMenuDefault3Props.className}
      />
    </div>
  );
}

export default MenuItemDefault;
