import React from "react";
import "./NavbarCartSection.css";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const NavbarCartSection = () => {
  return (
    <div className="navbarCartSectionDiv">
      <ShoppingCartIcon
        style={{ fontSize: 25 }}
        className="navbarCartSectionIcon"
      />
      Cart
    </div>
  );
};

export default NavbarCartSection;
