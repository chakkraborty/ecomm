import React from "react";
import "./Checkout.css";
import CheckOutNavbar from "./CheckOutNavbar";
import AddressComp from "./AddressComp.js";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Checkout = () => {
  const [pop, setPop] = useState(false);
  const [addressval, setAddressval] = useState([]);

  const [country, setCountry] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [area, setArea] = useState("");
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [flag, setFlag] = useState(false);

  const userInfo = localStorage.getItem("userInfo");
  const a = JSON.parse(userInfo);
  const userId = a._id;

  const [bill, setBill] = useState(0);
  const fetchCart = async () => {
    try {
      console.log(typeof userId);
      //const c = JSON.parse(userId);
      console.log(userId);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(`/api/cart/${userId}`, config);
      console.log(data);

      setBill(data.bill);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userId);

  const placeOrderHandler = async () => {
    try {
      console.log("haha");
      if (country.length > 0 && fullName.length > 0 && flag) {
        console.log(country.length);
        let d = country.length;
        console.log(typeof d);

        console.log(country);
        console.log(fullName);

        const config = {
          headers: {
            "Contest-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          `/api/cart/placeorder/${userId}`,
          {
            fullName,
            country,

            mobileNumber,
            pincode,
            houseNumber,
            area,
            city,
            state,
          },

          config
        );
      } else console.log("empty");
    } catch (error) {
      console.log("something went wrong");
    }
  };

  const closePopup = () => {
    setPop(false);
  };

  const fetchAddress = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(`/api/getaddress/${userId}`, config);
      setAddressval(data.addresses);
      console.log(addressval);

      console.log(data);
    } catch (error) {
      console.log("something is wrong");
    }
  };

  useEffect(() => {
    console.log("how");

    fetchAddress();
    fetchCart();
  }, []);

  return (
    <div>
      <CheckOutNavbar />
      <div className="checkOutPageWrapper">
        <div className="checkOutPageLeftSection">
          <div className="checkOutPageLeftSectionTitle">
            Select a delivery address
          </div>

          <div className="checkOutPageAddressBox">
            <div className="checkOutPageAddressBoxTitle">
              Your saved addresses :
            </div>

            {addressval?.map((p) => (
              <div className="checkOutPageAddressDataWrapper">
                <input
                  className="checkoutPageAddressDataRadio"
                  type="radio"
                  name="addressOption"
                  onClick={() => (
                    setFullName(p.fullName),
                    setCountry(p.country),
                    setMobileNumber(p.mobileNumber),
                    setPincode(p.pincode),
                    setHouseNumber(p.houseNumber),
                    setArea(p.area),
                    setCity(p.city),
                    setState(p.state)
                  )}
                ></input>
                <div className="checkoutPageAddressDataRightSection">
                  <p className="checkoutPageAddressDataRightSectionFullName">
                    {p.fullName}
                  </p>
                  <p>
                    {p.country} , Phone number : {p.mobileNumber}, Pincode :
                    {p.pincode}, {p.houseNumber},{p.area} , {p.city}, {p.state}
                  </p>
                </div>
              </div>
            ))}

            <div className="checkOutPageAddressBoxAddAddressSection">
              <div className="checkOutPageAddressBoxAddAddressSectionIcon">
                +
              </div>
              <div
                className="checkOutPageAddressBoxAddAddressSectionText"
                onClick={() => setPop(true)}
              >
                Add a new address
              </div>
            </div>
          </div>
          <div className="checkOutPageLeftSectionTitle">
            Select a payment method
          </div>

          <div className="checkOutPageAddressBox">
            <div className="checkOutPageAddressDataWrapper paymentWrapper">
              <input
                className="checkoutPageAddressDataRadio"
                type="radio"
                name="paymentOption"
                onClick={() => {
                  setFlag(true);
                }}
              ></input>
              <div className="checkoutPageAddressDataRightSection">
                Cash on delivery/Pay on delivery
              </div>
            </div>
          </div>

          <div
            onClick={placeOrderHandler}
            className="checkOutPagePlaceOrderButton"
          >
            Place Order
          </div>
        </div>

        <div className="checkOutPageRightSection">
          <div className="checkOutPageRightSectionButton">Order Summary</div>

          <div className="checkOutPageRightSectionItemsBox">
            <div>Items : </div>
            <div>Rs. {bill}</div>
          </div>
          <div className="checkOutPageRightSectionItemsBox">
            <div>Delivery : </div>
            <div>Rs. 0</div>
          </div>
          <div className="checkOutPageRightSectionItemsBox checkOutPageRightSectionItemsBoxLine">
            <div>Total : </div>
            <div>Rs. {bill}</div>
          </div>

          <div className="checkOutPageRightSectionItemsBoxTotal">
            <div>Order Total : </div>
            <div>Rs.{bill}</div>
          </div>
        </div>
      </div>
      {pop && <AddressComp closePopup={closePopup} />}
    </div>
  );
};

export default Checkout;
