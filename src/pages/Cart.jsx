import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useCartContext } from "../components/CartContext";
import Header from "../components/Header";

const Cart = () => {
  const {cart, handleDeleteItem, handleDeleteAll, updateCartQuantity} =
    useCartContext();

  // const [quantity, setQuantity] = useState(cart.map(() => 1));

  // const increment = (index) => {
  //   const newQuantity = [...quantity];
  //   newQuantity[index] += 1;
  //   setQuantity(newQuantity);
  // };

  // const decrement = (index) => {
  //   const newQuantity = [...quantity];
  //   if (newQuantity[index] > 1) {
  //     newQuantity[index] -= 1;
  //   }
  //   setQuantity(newQuantity);
  // };

  // const handleDelete = (index) => {
  //   const newQuantity = [...quantity];
  //   newQuantity[index] = 1;
  //   setQuantity(newQuantity);
  // };

  // //overall count of item quantity
  // const totalQuantity = quantity.reduce((acc, curr) => acc + curr, 0);

  // //overall subtotal
  // const totalPrice = cart
  //   .reduce((acc, item, index) => {
  //     return acc + item.unitPrice * quantity[index];
  //   }, 0)
  //   .toFixed(2);

  const [quantity, setQuantity] = useState(cart.map((item) => item.qty));

  // useEffect(() => {
  //   setQuantity(cart.map((item) => item.qty));
  // }, [cart]);

  useEffect(() => {
    cart.forEach((item, index) => {
      updateCartQuantity(item.id, quantity[index]);
    });
  }, [quantity]);

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

    handleDeleteItem(cart[index].id);
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
      return acc + item.unitPrice * quantity[index];
    }, 0)
    .toFixed(2);

  return (
    <>
        <div className="px-5 mt-20 ">
        <div class="right-sidebar-grid">
            <p className="text-3xl font-bold">Review cart</p>
            {totalQuantity === 0 ? (
            <main class="main-content flex justify-center items-center h-[60vh]">
                <div className="text-center">
                <i class="bi bi-cart-fill text-[60px] text-gray-300"></i>
                <p className="font-bold text-2xl mt-2">Your cart is empty</p>
                <p className="text-base mt-2">
                    Fill it up with all the things you love
                </p>
                {/* Put chat link here */}
                <button className="font-bold rounded-3xl py-2.5 px-5 mt-4 bg-[#E1251B] border-[#E1251B] text-white">
                    Start Shopping
                </button>
                </div>
            </main>
            ) : (
            <main class="main-content">
                {cart.map((item, index) => (
                <>
                    <div key={index}>
                    <Row>
                        {/* delete item */}
                        <Col className="flex items-center">
                        <button onClick={() => handleDelete(index)}>
                            <i className="bi bi-x-circle"></i>
                        </button>

                        <img src={item.imageURL} className="w-20 ml-auto" />
                        </Col>
                        <Col sm={10}>
                        <Row>
                            <Col sm={9}>
                            <h5>{item.productName}</h5>
                            </Col>
                            <Col sm={3}>
                            <h6 className="text-right font-bold text-xl">
                                ${(item.unitPrice * quantity[index]).toFixed(2)}
                            </h6>
                            {quantity[index] > 1 && (
                                <h6 className="text-right text-sm">
                                ${item.unitPrice.toFixed(2)} / each
                                </h6>
                            )}
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={2}></Col>
                        <Col sm={10} className="d-flex">
                        <button className="border border-[#161719] text-black px-4 py-2 rounded-3xl text-sm hover:bg-gray-100">
                            <i class="bi bi-file-text text-[16px]"></i> Add Note
                        </button>
                        <div className="ml-auto d-flex">
                            {quantity[index] > 1 ? (
                            <button
                                className="bg-gray-300 text-black px-2 py-1 rounded-l w-10 font-bold"
                                onClick={() => decrement(index)}
                            >
                                <i class="bi bi-dash-lg"></i>
                            </button>
                            ) : (
                            <button
                                className="bg-gray-300 text-black px-2 py-1 rounded-l w-10"
                                onClick={() => handleDelete(index)}
                            >
                                {/* <FontAwesomeIcon icon={faTrash} /> */}
                                <i class="bi bi-trash3-fill"></i>
                            </button>
                            )}
                            <input
                            type="number"
                            value={quantity[index]}
                            className="border-t border-b border-gray-300 text-center w-12 font-bold font"
                            style={{ textAlign: "center" }}
                            />
                            <button
                            className="bg-gray-300 text-black px-2 py-1 rounded-r w-10 font-bold"
                            onClick={() => increment(index)}
                            >
                            <i class="bi bi-plus-lg"></i>
                            </button>
                        </div>
                        </Col>
                    </Row>
                    <Row className="mt-3 mb-4">
                        <Col></Col>
                        <Col sm={10}>
                        <Card className="px-4 py-2 rounded-3xl">
                            If out of stock: <b>Best available</b>
                        </Card>
                        </Col>
                    </Row>
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
            <Card>
                <Card.Body>
                <p className="font-bold text-2xl">Order summary</p>
                <Row className="mt-4">
                    <Col>
                    Subtotal
                    {totalQuantity > 1 && <span>({totalQuantity} items)</span>}*
                    </Col>
                    <Col className="text-right">
                    <span className="text-base">${totalPrice}</span>
                    </Col>
                </Row>

                <Row className="mt-3 text-xl">
                    <Col>
                    <span className="order-summary-label">Estimated total</span>
                    </Col>

                    <Col className="text-right">
                    <span className="font-bold">${totalPrice}</span>
                    </Col>
                </Row>

                <div className="items-center flex justify-center mt-3">
                    <Button
                    variant={totalQuantity === 0 ? "secondary" : "danger"}
                    className="w-[100%] p-3 rounded-3xl font-bold"
                    disabled={totalQuantity === 0}
                    >
                    Start checkout
                    </Button>
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
                </Card.Body>
            </Card>
            </section>
        </div>
        </div>
        <Header/>
    </>
  );
};

export default Cart;
