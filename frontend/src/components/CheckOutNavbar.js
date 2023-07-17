import React from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import HttpsIcon from "@mui/icons-material/Https";
import "./CheckOutNavbar.css";
const CheckOutNavbar = () => {
  return (
    <div className="checkOutNavbarWrapper">
      <div className="checkOutNavbarWrapperLeftSection">
        <LocalMallIcon
          style={{ fontSize: 35 }}
          className="checkOutNavbarIcon"
        />
        <h2>Shopee</h2>
      </div>
      <div className="checkOutNavbarWrapperMidSection">Checkout</div>
      <div className="checkOutNavbarWrapperRightSection">
        <HttpsIcon />
      </div>
    </div>
  );
};

export default CheckOutNavbar;
