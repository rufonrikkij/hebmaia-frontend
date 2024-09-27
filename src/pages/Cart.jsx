import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useCartContext } from "../components/CartContext";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const { cart, handleDeleteItem, handleDeleteAll, updateCartQuantity } =
    useCartContext();

  const [quantity, setQuantity] = useState(cart.map((item) => item.quantity));

  useEffect(() => {
    setQuantity(cart.map((item) => item.quantity));
  }, [cart]);

  // useEffect(() => {
  //   cart.forEach((item, index) => {
  //     updateCartQuantity(item.productID, quantity[index]);
  //   });
  // }, [quantity]);
  useEffect(() => {
    cart.forEach((item, index) => {
      if (item.quantity !== quantity[index]) {
        updateCartQuantity(item.productID, quantity[index]);
      }
    });
  }, [quantity, cart, updateCartQuantity]);

  const increment = (index) => {
    const newQuantity = [...quantity];
    newQuantity[index] += 1;
    setQuantity(newQuantity);
  };

  const decrement = (index) => {
    const newQuantity = [...quantity];
    if (newQuantity[index] > 1) {
      newQuantity[index] -= 1;
    }
    setQuantity(newQuantity);
  };

  const handleDelete = (index) => {
    const newQuantity = [...quantity];
    newQuantity.splice(index, 1);
    setQuantity(newQuantity);

    handleDeleteItem(cart[index].productID);
  };

  const handleDeleteAllItems = () => {
    setQuantity([]); // Clear the quantity array
    handleDeleteAll(); // Clear the cart context
  };

  // overall count of item qty
  const totalQuantity = quantity.reduce((acc, curr) => acc + curr, 0);

  // overall subtotal
  const totalPrice = cart
    .reduce((acc, item, index) => {
      return acc + item.productPrice * quantity[index];
    }, 0)
    .toFixed(2);

  return (
    <>
      <div className=" mt-20 ">
        <div class="right-sidebar-grid">
          {totalQuantity === 0 ? (
            <main class="main-content">
              <p className="text-3xl font-bold mb-4 p-1">Review cart</p>
              <div className="flex flex-col justify-center items-center h-screen">
                <i class="bi bi-cart-fill text-[60px] text-gray-300"></i>
                <p className="font-bold text-2xl mt-2">Your cart is empty</p>
                <p className="text-base mt-2">
                  Fill it up with all the things you love
                </p>
                <button className="font-bold rounded-3xl py-2.5 px-5 mt-4 bg-[#E1251B] border-[#E1251B] text-white">
                  Start Shopping
                </button>
              </div>
            </main>
          ) : (
            <main class="main-content">
              <p className="text-3xl font-bold mb-4 p-1">Review cart</p>
              {cart.map((item, index) => (
                <>
                  <div key={index}>
                    <div className="row">
                      {/* delete item */}
                      <div className="col-sm-2 flex items-center">
                        <button
                          className=""
                          onClick={() => handleDelete(index)}
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>

                        <img src={item.imageUrl} className="w-20 mr-auto" />
                      </div>

                      <div className="col-sm-10">
                        <div className="row">
                          <div className="col-sm-9">
                            <p className="text-base">{item.productName}</p>
                          </div>
                          <div className="col-sm-3">
                            <h6 className="text-right font-bold text-xl">
                              $
                              {(item.productPrice * quantity[index]).toFixed(2)}
                            </h6>
                            {quantity[index] > 1 && (
                              <h6 className="text-right text-sm">
                                ${item.productPrice.toFixed(2)} / each
                              </h6>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-10 d-flex">
                        <button className="border border-[#161719] text-black px-4 py-2 rounded-3xl text-sm hover:bg-gray-100">
                          <i class="bi bi-file-text text-[16px]"></i> Add Note
                        </button>
                        <div className="ml-auto d-flex">
                          {quantity[index] > 1 ? (
                            <button
                              className="bg-gray-300 text-black px-2 py-1 rounded-l-full w-10 font-bold"
                              onClick={() => decrement(index)}
                            >
                              <i class="bi bi-dash-lg"></i>
                            </button>
                          ) : (
                            <button
                              className="bg-gray-300 text-black px-2 py-1 rounded-l-full w-10 font-bold"
                              onClick={() => handleDelete(index)}
                            >
                              <i class="bi bi-trash3-fill"></i>
                            </button>
                          )}
                          <input
                            value={quantity[index]}
                            className="border-t border-b border-gray-300 text-center w-12 font-bold font align-middle"
                            style={{ textAlign: "center" }}
                            readOnly
                          />
                          <button
                            className="bg-gray-300 text-black px-2 py-1 rounded-r-full w-10 font-bold"
                            onClick={() => increment(index)}
                          >
                            <i class="bi bi-plus-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3 mb-4">
                      <div className="col"></div>
                      <div className="col-sm-10">
                        <div className="card px-4 py-2 rounded-3xl">
                          If out of stock: <b>Best available</b>
                        </div>
                      </div>
                    </div>
                    <hr className="my-3" />
                  </div>
                </>
              ))}

              <div className="flex justify-end">
                <button
                  className="border border-[#161719] text-black px-6 py-3 rounded-3xl text-sm hover:bg-gray-100 font-bold"
                  onClick={handleDeleteAllItems}
                >
                  <i class="bi bi-trash3-fill text-[16px]"></i> Empty cart
                </button>
              </div>
            </main>
          )}

          {/* Right sidebar */}
          <section class="right-sidebar">
            <div className="card mt-5">
              <div className="card-body">
                <p className="font-bold text-2xl">Order summary</p>
                <div className="row mt-4">
                  <div className="col">
                    Subtotal
                    {totalQuantity > 1 && <span>({totalQuantity} items)</span>}*
                  </div>
                  <div className="col text-right">
                    <span className="text-base">${totalPrice}</span>
                  </div>
                </div>

                <div className=" row mt-3 text-xl">
                  <div className="col">
                    <span className="order-summary-label">Estimated total</span>
                  </div>

                  <div className="col text-right">
                    <span className="font-bold">${totalPrice}</span>
                  </div>
                </div>

                <div className="items-center flex justify-center mt-3">
                  <button
                    className={`w-[100%] p-3 rounded-3xl font-bold text-white ${
                      totalQuantity === 0 ? "bg-secondary" : "bg-danger"
                    }`}
                    disabled={totalQuantity === 0}
                  >
                    Start checkout
                  </button>
                </div>

                <div className="mt-4">
                  <button className="font-bold text-black text-sm">
                    <i class="bi bi-file-text-fill mr-2"></i>
                    Add order note
                  </button>
                </div>

                <div className="mt-3">
                  <button className="font-bold text-black text-sm">
                    <i class="bi bi-tags-fill mr-2"></i>Add promo code
                  </button>
                </div>

                <p className="text-xs mt-3">
                  *Online and in-store prices may vary. Your estimated total may
                  change to reflect substitutions and final item weights.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Header />
    </>
  );
};

export default Cart;
