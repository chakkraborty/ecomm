import React from "react";
import Navbar from "./Navbar.js";
import image from "./fifaimage.png";
import { useState } from "react";
import { useEffect } from "react";
import "./HomePage.css";
import axios from "axios";

import "./HomePage.css";
const HomePage = () => {
  const [product, setProduct] = useState([]);

  const userInfo = localStorage.getItem("userInfo");
  const a = JSON.parse(userInfo);
  const userId = a._id;
  console.log(userId);
  console.log(typeof userId);

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    console.log(data);
    setProduct(data);
  };

  const addToCartHandler = async ({ userId, productId, quantity }) => {
    console.log(productId);

    try {
      const config = {
        headers: {
          "Contest-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/cart/${userId}`,
        { productId, quantity },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <img
        src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="homePageBanner"
      ></img>
      <div className="homePageGridWrapper">
        {product.map((p) => (
          <div className="homeProductBox">
            {/* <div className="homeProductBoxImage"></div> */}
            <img className="homeProductBoxImage" src={p.image}></img>
            <div className="homeProductInfoWrapper">
              <h4 className="homeProductTitle">{p.title}</h4>
              <h4 className="homeProductDescription">{p.description}</h4>
            </div>
            <div className="homeProductPrice">Rs. {p.price}</div>
            <div
              className="homeProductAddToCartButton"
              onClick={() =>
                addToCartHandler({ userId, productId: p._id, quantity: 1 })
              }
            >
              Add to cart
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
