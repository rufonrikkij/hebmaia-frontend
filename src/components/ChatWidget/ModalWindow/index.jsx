import { styles } from "./../styles";
import "../../../assets/Style.css";
import "./typingstyle.css";
// import { FaBeer } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useState, useEffect, useRef } from "react";
import { chatMessage } from "../../../service/ChatAIService";
import { useCartContext } from "../../../components/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CardBody } from "react-bootstrap";

//for displaying the model view/Window
function ModalWindow(props) {
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const [userMessages, setUserMessages] = useState([]);
  const [newUserMessage, setNewUserMessage] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [reviewChecked, setReviewChedked] = useState([]);
  const { handleAddToCart } = useCartContext();
  // let totalAmount = 0;
  const totalAmount = checkedItems.reduce(
    (total, item) => total + Number(item.finalPrice),
    0
  );

  const aiChat = async (newmsg) => {
    setTimeout(() => {
      setIsTyping(true);
    }, 2000);
    console.log(chatMessage(newmsg));
    await chatMessage(newmsg)
      .then((response) => {
        //single data
        // sendUserMessage(response.data.outputResponse.message,
        //     response.data.outputResponse.recipe.dishName,
        //     response.data.outputResponse.recipe.ingredients ,
        //     response.data.outputResponse.recipe.instructions,
        //     response.data.outputResponse.recommendedProducts,
        //     response.data.outputResponse.suggestedProducts);
        //multi async data
        // sendUserMessage(response.data.recipeResponse.message,
        //     response.data.recipeResponse.recipe.dishName,
        //     response.data.recipeResponse.recipe.ingredients ,
        //     response.data.recipeResponse.recipe.instructions,
        //     response.data.recommendedProductsResponse.recommendedProducts,
        //     response.data.suggestedProductsResponse.suggestedProducts);
        // multi async with quantity data
        if (response.data.recipeResponse.recipe != null) {
          sendUserMessage(
            response.data.recipeResponse.message,
            response.data.recipeResponse.recipe.dishName,
            response.data.recipeResponse.recipe.ingredients,
            response.data.recipeResponse.recipe.instructions,
            response.data.recommendedProductsResponse.message,
            response.data.recommendedProductsResponse.recommendedProducts,
            response.data.suggestedProductsResponse.message,
            response.data.suggestedProductsResponse.suggestedProducts
          );
          console.log(response.data);
        } else {
          sendUserMessage(
            response.data.recipeResponse.message,
            "",
            [],
            [],
            "",
            [],
            "",
            []
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setIsTyping(false);
  };

  const navigate = useNavigate();

  const goToShoppingCart = () => {
    navigate("/shoppingcart");
    // window.open('http://localhost:5173/shoppingcart', '_blank', 'noopener,noreferrer');
  };

  //   useEffect(() => {
  //     const initialCheckedItems = userMessages.flatMap((fields) => {
  //       const recommendedProducts =
  //         fields.recommendedProductsResponse?.recommendedProducts || [];
  //       const suggestedProducts =
  //         fields.suggestedProductsResponse?.suggestedProducts || [];
  //       return [...recommendedProducts, ...suggestedProducts].filter(
  //         (item) => item.checked
  //       );
  //     });
  //     console.log(initialCheckedItems);
  //     setCheckedItems("check",initialCheckedItems);
  //   }, [userMessages]);

  useEffect(() => {
    const initialCheckedItems = userMessages.flatMap((fields) =>
      [...fields.suggested, ...fields.recommended].filter(
        (item) => item.checked
      )
    );
    setCheckedItems(initialCheckedItems);
  }, [userMessages]);

  const handleCheckedItem = (item) => {
    setCheckedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );
  };
  // const handleCheckedItem = (item) => {
  //   setCheckedItems((prevSelectedItems) => {
  //     if (prevSelectedItems.some((i) => i.id === item.productID)) {
  //       return prevSelectedItems.filter((i) => i.id !== item.productID);
  //     } else {
  //       return [...prevSelectedItems, item];
  //     }
  //   });
  // };

  // useEffect(() => {
  //     userMessages.map(fields => {
  //         setCheckedItems(fields.suggested);
  //     })
  //   }, []);

  // const handleCheckboxChange = (event) => {
  //     const { name, checked, value, dataset } = event.target;
  //     const price = dataset.price;
  //     setCheckedItems((prev) =>
  //       checked
  //         ? [...prev, { name, value, price}]
  //         : prev.filter((item) => item.name !== name)
  //     );
  //   };
  //   useEffect(() => {
  //     setCheckedItems(() => [
  //       {
  //         id: 1,
  //         productName:
  //           "H-E-B Organics Texas Roots Whole Baby Bella Mushrooms, 8 oz",
  //         imageURL:
  //           "https://images.heb.com/is/image/HEBGrocery/001854430-1?jpegSize=150&hei=1400&fit=constrain&qlt=75",
  //         unitPrice: 3.08,
  //         quantity: 1,
  //       },
  //       {
  //         id: 2,
  //         productName: "Central Market Organic Super Greens Blend 5oz",
  //         imageURL:
  //           "https://images.heb.com/is/image/HEBGrocery/001592751-1?jpegSize=150&hei=1400&fit=constrain&qlt=75",
  //         unitPrice: 3.62,
  //         quantity: 1,
  //       },
  //       {
  //         id: 3,
  //         productName: "H-E-B Healthy Marinara Pasta Sauce, 15.5 oz",
  //         imageURL:
  //           "https://images.heb.com/is/image/HEBGrocery/001535352-1?jpegSize=150&hei=1400&fit=constrain&qlt=75",
  //         unitPrice: 2.48,
  //         quantity: 1,
  //       },
  //     ]);
  //   });

  // function handleGetAmount(amount) {
  //   totalAmount += amount;
  //   return amount;
  // }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [userMessages]);

  const handleSendMessage = async () => {
    if (newUserMessage.trim()) {
      setUserMessages([
        ...userMessages,
        {
          dishName: "",
          ingredients: [],
          instructions: [],
          recommended: [],
          suggested: [],
          bot_message: "",
          user_message: newUserMessage,
        },
      ]);
      setNewUserMessage("");
      //   setMsg(newUserMessage);
      aiChat(newUserMessage);
    }
  };

  const handleSendShoppingCart = () => {
    setIsTyping(true);
    setTimeout(() => {
      setUserMessages((prevMessages) => [
        ...prevMessages,
        {
          dishName: "",
          ingredients: [],
          instructions: [],
          recommended: [],
          suggested: [],
          bot_message: "",
          user_message: "",
          review_message: "",
          end_message:
            "Selected items are added to your cart. Thank you for allowing me to assist you in creating a fantastic dish! Here's your shopping cart.",
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const sendUserMessage = (
    aimsg,
    dish,
    ingr,
    inst,
    recoMsg,
    reco,
    sgtMsg,
    sgt
  ) => {
    // setIsLoading(true);
    if (dish != "") {
      setTimeout(() => {
        setUserMessages((prevMessages) => [
          ...prevMessages,
          {
            dishName: "",
            ingredients: [],
            instructions: [],
            recommended: [],
            suggested: [],
            bot_message: aimsg,
            user_message: "",
            review_message: "",
            end_message: "",
          },
        ]);
        //   setIsLoading(false);
      });
      setTimeout(() => {
        setUserMessages((prevMessages) => [
          ...prevMessages,
          {
            dishName: dish,
            ingredients: ingr,
            instructions: inst,
            recommended: [],
            suggested: [],
            bot_message: "",
            user_message: "",
            review_message: "",
            end_message: "",
          },
        ]);
        //   setIsLoading(false);
      }, 2000);
      setTimeout(() => {
        setUserMessages((prevMessages) => [
          ...prevMessages,
          {
            dishName: "",
            ingredients: [],
            instructions: [],
            recommended: [],
            suggested: [],
            bot_message:
              "I’ve also prepared some products that will work best for preparing this dish.",
            user_message: "",
            review_message: "",
            end_message: "",
          },
        ]);
        //   setIsLoading(false);
      }, 8000);
      setTimeout(() => {
        setUserMessages((prevMessages) => [
          ...prevMessages,
          {
            dishName: "",
            ingredients: [],
            instructions: [],
            recommended: reco,
            suggested: [],
            bot_message:
              recoMsg +
              " You can select items you want to include in your shopping list. Let me know if you’re done shopping or selecting items.",
            user_message: "",
            review_message: "",
            end_message: "",
          },
        ]);
        //   setIsLoading(false);
      }, 10000);
      setTimeout(() => {
        setUserMessages((prevMessages) => [
          ...prevMessages,
          {
            dishName: "",
            ingredients: [],
            instructions: [],
            recommended: [],
            suggested: [],
            bot_message:
              "I’ve also prepared products that would go best while you’re enjoying your " +
              dish,
            user_message: "",
            review_message: "",
            end_message: "",
          },
        ]);
        //   setIsLoading(false);
      }, 12000);
      setTimeout(() => {
        setUserMessages((prevMessages) => [
          ...prevMessages,
          {
            dishName: "",
            ingredients: [],
            instructions: [],
            recommended: [],
            suggested: sgt,
            bot_message:
              sgtMsg +
              " You can select items you want to include in your shopping list. Let me know if you’re done shopping or selecting items.",
            user_message: "",
            review_message: "",
            end_message: "",
          },
        ]);
        //   setIsLoading(false);
      }, 14000);
    } else {
      setTimeout(() => {
        setUserMessages((prevMessages) => [
          ...prevMessages,
          {
            dishName: "",
            ingredients: [],
            instructions: [],
            recommended: [],
            suggested: [],
            bot_message: "",
            user_message: "",
            review_message: aimsg,
          },
        ]);
        //   setIsLoading(false);
      });
    }
  };

  const handleInputChange = (e) => {
    setNewUserMessage(e.target.value);
    // setShowSuggestions(false);
  };

  const handleNewChat = () => {
    setUserMessages([
      {
        // sender: "Su-San",
        type: "bot",
        text: "test this bot new message",
        // timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const roundToTwoDecimalPlaces = (num) => {
    return parseFloat(num.toFixed(2));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      //   alert('Enter pressed')
      handleSendMessage;
    }
  };
  // returning display
  return (
    <div
      style={{
        ...styles.modalWindow,
        ...{ opacity: props.visible ? "1" : "0" },
      }}
    >
      {/* <span>Hello there!</span> */}

      {/*jabdia */}
      <div className="bg-[#d5281d] flex">
        {/* <div className="md:px-10 py-5 px-7 md:flex justify-between items-center bg-[#ffffff]">
                    <div className="flex cursor-pointer items-center">
                        <p className="font-sans font text-2xl text-[#d5281d] font-bold">HEB</p>
                        <p className="font-sans font text-2xl text-[#000000] font-bold">.RAIA</p>
                    </div>
                </div> */}
        <img
          className="img w-auto h-[50px]"
          src="src/assets/img/chat-icon.png"
          alt="MAIA"
        />
        <p className="font-sans font text-sm text-[#ffffff] font-bold mt-[15px]">
          HEB.MAIA
        </p>
      </div>

      <div
        className="bg-white overflow-y-scroll h-[77%] p-[10px]"
        ref={chatContainerRef}
      >
        {/* paste here loop for messages */}
        {userMessages.map((msg, index) => (
          <div key={index}>
            {/* {msg.outputResponse.map((content,index) =>(
                            <div key={index}> */}
            {msg.user_message !== "" ? (
              // user normal message
              <div className="bg-[#d5281d] p-[10px] h-fit ml-[45%] rounded-md mt-[5px] mr-[5%] max-w-[50%] text-[#ffffff] text-[13px] font-sans">
                <p>{msg.user_message}</p>
              </div>
            ) : "" ||
              (msg.bot_message !== "" &&
                msg.recommended.length === 0 &&
                msg.suggested.length === 0) ? (
              // bot normal message

              <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                <img
                  className="img w-auto h-[30px] flex flex-col ml-[3%]"
                  src="src/assets/img/maia-icon.png"
                  alt="MAIA"
                />
                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                  <p>{msg.bot_message}</p>
                </div>
              </div>
            ) : "" || msg.dishName !== "" ? (
              <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                <img
                  className="img w-auto h-[30px] flex flex-col ml-[3%]"
                  src="src/assets/img/maia-icon.png"
                  alt="MAIA"
                />

                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                  <p className="text-sm uppercase font-bold">{msg.dishName}</p>
                  <p className="font-semibold mt-[10px]">Ingredients</p>
                  <ul className="list-disc ml-[15px]">
                    {/* {console.log(msg.ingredients)} */}
                    {msg.ingredients.map((ingList, index) => (
                      <li key={index}>{ingList}</li>
                    ))}
                  </ul>
                  <p className="font-semibold mt-[10px]">Instructions</p>
                  <ol className="list-decimal">
                    {msg.instructions.map((insList, index) => (
                      <li key={index}>{insList}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : "" || msg.recommended.length > 0 ? (
              <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                <img
                  className="img w-auto h-[30px] content-end ml-[3%]"
                  src="src/assets/img/maia-icon.png"
                  alt="MAIA"
                />
                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                  <p className="mb-[15px]">{msg.bot_message}</p>
                  {msg.recommended.map((data) => (
                    <div className="bg-white rounded-sm w-[100%] mt-[5px] flex p-[5px]">
                      <div className="w-[5%] mr-[5%] content-center">
                        {/* <input type="checkbox" defaultChecked={true} /> */}
                        <input
                          type="checkbox"
                          name={data.productName}
                          data-price={data.productPrice}
                          checked={checkedItems.includes(data)}
                          onChange={() => handleCheckedItem(data)}
                        />
                      </div>
                      <div className="w-[65%] mr-[5px]">
                        <p>
                          <b>{data.quantity} x </b>
                          {data.productName}
                        </p>
                      </div>
                      <div className="w-[30%] content-center mr-[5px] text-right">
                        <p className=" font-bold">
                          ${Number(data.finalPrice).toFixed(2)}
                        </p>
                        <p className="text-[10px]">
                          ${Number(data.productPrice).toFixed(2)} ea.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : "" || msg.suggested.length > 0 ? (
              <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                <img
                  className="img w-auto h-[30px] content-end ml-[3%]"
                  src="src/assets/img/maia-icon.png"
                  alt="MAIA"
                />
                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                  <p className="mb-[15px]">{msg.bot_message}</p>
                  {msg.suggested.map((data, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-sm w-[100%] mt-[5px] flex p-[5px]"
                    >
                      <div className="flex">
                        <input
                          className="w-[10%] mr-[5%] content-center"
                          type="checkbox"
                          name={data.productName}
                          data-price={data.productPrice}
                          checked={checkedItems.includes(data)}
                          onChange={() => handleCheckedItem(data)}
                        />
                        <p className="w-[70%] mr-[5px]">
                          <b>{data.quantity}x </b> {data.productName}
                        </p>
                      </div>

                      <div className="w-[20%] content-center mr-[5px]">
                        <p className="font-bold">
                          {isNaN(Number(data.productPrice))
                            ? data.productPrice
                            : `$${parseFloat(data.productPrice).toFixed(2)}`}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div>
                    <h5 className="mt-2">Checked Items:</h5>
                    {checkedItems.map((item, index) => (
                      <div key={index}>
                        {item.productName || item.name}$
                        {item.productPrice || item.price}
                        <hr
                          className="my-1"
                          style={{
                            border: "none",
                            borderTop: "1px solid black",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  {/* <div>
                    <h3>Checked Items:</h3>
                    <ul>
                      {checkedItems.map((item) => (
                        <li>
                          {item.name}x{item.price}
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </div>
              </div>
            ) : "" || msg.review_message !== "" ? (
              <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                <img
                  className="img w-auto h-[30px] content-end ml-[3%]"
                  src="src/assets/img/maia-icon.png"
                  alt="MAIA"
                />
                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                  <p className="text-sm mb-[15px]">{msg.review_message}</p>

                  {checkedItems.map((item) => (
                    <div className="bg-white w-[100%] rounded-sm mt-[5px] flex p-[5px]">
                      <div className="w-[10%] mr-[5%] content-center">
                        <input type="checkbox" defaultChecked={true} />
                      </div>
                      <div className="w-[70%] mr-[5px]">
                        <p>
                          <b>{item.quantity}x</b> {item.productName}
                        </p>
                      </div>
                      <div className="w-[30%] content-center mr-[5px] text-right">
                        <p className=" font-bold">
                          ${Number(item.finalPrice).toFixed(2)}
                        </p>
                        <p className="text-[10px]">
                          ${Number(item.productPrice).toFixed(2)} ea.
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="content-center">
                    <button
                      className="bg-[#d5281d] border-1 text-[#FFF9ED] text-sm hover:bg-[#811911] hover:border-[#811911] w-[90%] m-[10px] rounded-none"
                      onClick={() => {
                        handleAddToCart(checkedItems), handleSendShoppingCart();
                      }}
                    >
                      Add to cart &nbsp; ${totalAmount.toFixed(2)}
                    </button>
                  </div>
                </div>
              </div>
            ) : "" || msg.end_message !== "" ? (
              <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                <img
                  className="img w-auto h-[30px] content-end ml-[3%]"
                  src="src/assets/img/maia-icon.png"
                  alt="MAIA"
                />
                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                  <p className="text-sm mb-[15px]">{msg.end_message}</p>

                  <div className="content-center">
                    {/* <Link to="/shoppingcart"> */}
                    <button
                      className="bg-[#d5281d] border-1 text-[#FFF9ED] text-sm hover:bg-[#811911] hover:border-[#811911] w-[90%] m-[10px] rounded-none"
                      onClick={goToShoppingCart}
                    >
                      View Shopping Cart
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* </div>
                        ))} */}
          </div>
        ))}
        {
          isTyping && (
            <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
              <img
                className="img w-auto h-[30px] flex flex-col ml-[3%]"
                src="src/assets/img/maia-icon.png"
                alt="MAIA"
              />
              <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                {/* <span>Typing</span> */}
                <div className="dots">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              </div>
            </div>
          )

          // <div className="typing">
          //     <span>Typing</span>
          //     <span className="dot">.</span>
          //     <span className="dot">.</span>
          //     <span className="dot">.</span>
          // </div>
        }
      </div>

      <div className="bg-[#e6e6e6] absolute flex inset-x-0 bottom-0 p-[10px]">
        <input
          type="text"
          // class={`form-control ${errors.name ? 'is-invalid': ''}`}
          id="userInput"
          // min={data.min}
          placeholder=" Type a message..."
          value={newUserMessage}
          onChange={handleInputChange}
          className="rounded-xl w-[90%] text-sm p-[10px]"
          // onChange={(e) => setName(e.target.value)}
          // data-testid="name-field"
          onKeyDown={handleKeyPress}
          tabIndex="0"
        ></input>
        <img
          onClick={handleSendMessage}
          disabled={isTyping}
          className="img w-auto h-[30px] ml-[5%] mt-[5px]"
          src="src/assets/img/send-button.png"
          alt="send"
        />
        {/* <BsSendFill className="w-auto h-[30px] ml-[2%] mt-[5px]" /> */}
        {/* <FontAwesomeIcon icon="fa-solid fa-paper-plane-top" /> */}
        {/* <i class="fa-solid fa-paper-plane-top"></i> */}
        {/* <i class="fa-solid fa-paper-plane-top"></i> */}
      </div>
    </div>
  );
}
export default ModalWindow;
