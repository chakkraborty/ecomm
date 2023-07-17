import React from "react";
import "./AddressComp.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const AddressComp = ({ closePopup }) => {
  const [country, setA] = useState("");
  const [fullName, setB] = useState("");
  const [mobileNumber, setC] = useState("");
  const [pincode, setD] = useState("");
  const [houseNumber, setE] = useState("");
  const [area, setF] = useState("");
  const [city, setG] = useState("");
  const [state, setH] = useState("");
  const [i, setI] = useState("");
  const userInfo = localStorage.getItem("userInfo");
  const aa = JSON.parse(userInfo);
  console.log(typeof aa);
  const userId = aa._id;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/postaddress/${userId}`,
        {
          country,
          fullName,
          mobileNumber,
          pincode,
          houseNumber,
          area,
          city,
          state,
        },
        config
      );
      console.log(data);
    } catch (error) {
      console.log("something went wrong");
    }
  };

  return (
    <>
      <div className="addAddressPopupMainWrapper"></div>
      <div className="addAddressPopupWrapper">
        <div className="addAddressPopupFirst">
          Enter a new delivery address
          <CloseIcon className="closeAddAddressPopup" onClick={closePopup} />
        </div>

        <div className="addAddressPopup">
          <div className="addAddressPopupSecond">Add a new address</div>

          <div className="addressPopupBottomTitle">Country/Region</div>
          <input
            className="addressPopupInput"
            onChange={(e) => setA(e.target.value)}
          ></input>
          <div className="addressPopupBottomTitle">Full Name</div>
          <input
            className="addressPopupInput"
            onChange={(e) => setB(e.target.value)}
          ></input>
          <div className="addressPopupBottomTitle">Mobile Number</div>
          <input
            className="addressPopupInput"
            onChange={(e) => setC(e.target.value)}
          ></input>
          <div className="addressPopupBottomTitle">Pincode</div>
          <input
            className="addressPopupInput"
            onChange={(e) => setD(e.target.value)}
          ></input>
          <div className="addressPopupBottomTitle">
            Flat, House no., Building
          </div>
          <input
            className="addressPopupInput"
            onChange={(e) => setE(e.target.value)}
          ></input>
          <div className="addressPopupBottomTitle">Area, Street, Sector</div>
          <input
            className="addressPopupInput"
            onChange={(e) => setF(e.target.value)}
          ></input>
          <div className="addressPopupBottomTitle">Town/City</div>
          <input
            className="addressPopupInput"
            onChange={(e) => setG(e.target.value)}
          ></input>

          <div className="addressPopupBottomTitle">State</div>
          <input
            className="addressPopupInput"
            onChange={(e) => setH(e.target.value)}
          ></input>
          <div className="addressPopupButton" onClick={submitHandler}>
            Add this address
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressComp;
