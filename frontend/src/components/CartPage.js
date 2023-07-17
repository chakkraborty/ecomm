import React from "react";
import Navbar from "./Navbar.js";
import "./CartPage.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartPage = () => {
  const userInfo = localStorage.getItem("userInfo");
  const a = JSON.parse(userInfo);
  console.log(typeof a);
  const userId = a._id;

  const [cartItems, setCartItem] = useState([]);
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
      setCartItem(data.items);
      setBill(data.bill);
      console.log(cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCount = async ({ userId, productId, quantity }) => {
    try {
      if (quantity > 0) {
        const { data } = await axios.put(`/api/cart/${userId}`, {
          productId,
          quantity,
        });
        console.log(data);
        fetchCart();

        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemHandler = async ({ userId, productId }) => {
    try {
      const config = {
        headers: {
          "Contest-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `/api/cart/${userId}/${productId}`,
        config
      );
      console.log(data);
      fetchCart();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="cartPageWrapperDiv">
        <div className="cartPageWrapper">
          <div className="cartPageLeftSection">
            <div className="cartPageTitle">
              My shopping cart ( {cartItems ? cartItems.length : 0} items )
            </div>

            {cartItems?.map((p) => (
              <div className="cartPageItem">
                <img className="cartPageItemImage" src={p.image}></img>

                <div className="cartPageItemRightSectionWrapper">
                  <div className="cartPageItemTitlePriceWrapper">
                    <div className="cartPageItemTitle">{p.title}</div>
                    <div className="cartPageItemPrice">Rs. {p.price}</div>
                  </div>

                  <div className="cartPageItemQuantity">
                    <div className="xyc">Qty.</div>
                    <div className="cartPageItemQuantityBox">
                      <div
                        className="cartPageItemQuantityBoxDec"
                        onClick={() =>
                          updateCount({
                            userId,
                            productId: p.productId,
                            quantity: p.quantity - 1,
                          })
                        }
                      >
                        -
                      </div>
                      <div className="cartPageItemQuantityValue">
                        {p.quantity}
                      </div>
                      <div
                        className="cartPageItemQuantityBoxInc"
                        onClick={() =>
                          updateCount({
                            userId,
                            productId: p.productId,
                            quantity: p.quantity + 1,
                          })
                        }
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div
                    className="cartPageItemRemove"
                    onClick={() =>
                      deleteItemHandler({ userId, productId: p.productId })
                    }
                  >
                    <DeleteOutlineIcon />
                    Remove
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cartPageRightSection">
            <div className="cartPageBillBox">
              <div className="cartPageBillBoxTitle">
                PRICE DETAILS ({cartItems ? cartItems.length : 0} items)
              </div>
              <div className="cartPageBillBoxBillAmount">
                <div className="cartPageBillBoxMRPWrapper">
                  <div>Total MRP</div>
                  <div>Rs. {bill}</div>
                </div>

                <div className="cartPageBillBoxMRPWrapper">
                  <div>Discount on MRP</div>
                  <div>Rs. 0</div>
                </div>
                <div className="cartPageBillBoxMRPWrapper">
                  <div>Coupon Discount MRP</div>
                  <div>Rs. 0</div>
                </div>

                <div className="cartPageBillBoxDeliverWrapper">
                  <div>Delivery</div>
                  <div className="cartPageBillBoxDeliveryFree">FREE</div>
                </div>

                <div className="cartPageBillBoxTotalAmount">
                  <div>Total Amount</div>
                  <div>Rs. {bill}</div>
                </div>
                <div className="cartPagePlaceOrderButton">Place Order</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
