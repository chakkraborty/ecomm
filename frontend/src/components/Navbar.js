import React from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import NavbarCartSection from "./NavbarCartSection";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import NavbarLoginOption from "./NavbarLoginOption.js";
import { useState, useEffect } from "react";
import ReturnAndOrders from "./ReturnAndOrders";

const Navbar = () => {
  const [f, setF] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setF(true);
    }
  }, []);

  return (
    <div className="navbarDiv">
      <div className="navbarLogo">
        <LocalMallIcon className="navbarLogoIcon" />
        <div className="navbarLogoTitle">Shopee</div>
      </div>
      <div className="navbarSearchDiv">
        <input
          type="text"
          className="navbarSearchField"
          placeholder="Search..."
        ></input>
        <div className="navbarSearchIconBg">
          <SearchIcon />
        </div>
      </div>
      {!f && <NavbarLoginOption />}
      <div className="navbarRightSection">
        {f && <NavbarCartSection />}
        {f && <ReturnAndOrders />}
      </div>
    </div>
  );
};

export default Navbar;
