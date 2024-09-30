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
  const [products, setProducts] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [reviewChecked, setReviewChedked] = useState([]);
  const { handleAddToCart } = useCartContext();
  let totalAmount = 0;

  //call AI API
  const aiChat = async (newmsg) => {
    setTimeout(() => {
      setIsTyping(true);
    }, 2000);
    console.log(chatMessage(newmsg));
    await chatMessage(newmsg)
      .then((response) => {
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
  const { messages, setMessages } = useCartContext();
  // const { userMessages, setUserMessages } = useCartContext();

  const goToShoppingCart = () => {
    // setMessages([...messages, userMessages]);
    setMessages(userMessages);
    setUserMessages([]);
    totalAmount=0;
    navigate("/shoppingcart");
    // window.open('http://localhost:5173/shoppingcart', '_blank', 'noopener,noreferrer');
  };

  //initial message of maia
  useEffect(() => {
    setCheckedItems([]);
    setUserMessages((prevChatLog) => [
      ...prevChatLog,
      {
        dishName: "",
        ingredients: [],
        instructions: [],
        recommended: [],
        suggested: [],
        bot_message:
          "Hi I’m HEB's MAIA but you can call me Maia, let’s cook delicious meals together! ",
        user_message: "",
        review_message: "",
      },
    ]);
  }, []);

  //get already checked items
  useEffect(() => {
    const initialCheckedItems = userMessages.flatMap((fields) =>
      [...fields.suggested, ...fields.recommended].filter(
        (item) => item.checked
      )
    );
    setCheckedItems(initialCheckedItems);
  }, [userMessages]);

  //handle check items
  const handleCheckedItem = (item) => {
    setCheckedItems((prevSelectedItems) =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter((i) => i !== item)
        : [...prevSelectedItems, item]
    );

    // Update the checked property in userMessages
    setUserMessages((prevUserMessages) =>
      prevUserMessages.map((fields) => ({
        ...fields,
        suggested: fields.suggested.map((i) =>
          i === item ? { ...i, checked: !i.checked } : i
        ),
        recommended: fields.recommended.map((i) =>
          i === item ? { ...i, checked: !i.checked } : i
        ),
      }))
    );
  };

  //handle the total amount computation
  function handleGetAmount(amount) {
    if(typeof amount === 'string'){
      if(amount.includes('$')){
        const  newAmount = parseFloat(amount.replace(/[$,]/g, ''));
        totalAmount += newAmount;
        return newAmount;
      }else{
        const newAmount = parseFloat(amount);
        totalAmount += newAmount;
        return newAmount;
      }
      
    }else{
      totalAmount += amount;
      return amount;
    }
  }
  // overall subtotal
  // function handleGetAmount(item) {
  //   return item
  //     .reduce((acc, item) => {
  //       return acc + item.productPrice * item.quantity;
  //     }, 0)
  //     .toFixed(2);
  // }

  //container of messages
  useEffect(() => {
    if (chatContainerRef.current) {
      //   chatContainerRef.current.scrollTop =
      //     chatContainerRef.current.scrollHeight;
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userMessages]);

  //handle new message from user
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
          review_message: "",
        },
      ]);
      setNewUserMessage("");
      //   setMsg(newUserMessage);
      aiChat(newUserMessage);
    }
  };
  const handleInputChange = (e) => {
    setNewUserMessage(e.target.value);
    // setShowSuggestions(false);
  };

  //handle redirect user to shopping cart
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

  //handle ai message/responses
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
      if (aimsg == "Your generated message") {
        setTimeout(() => {
          setUserMessages((prevMessages) => [
            ...prevMessages,
            {
              dishName: "",
              ingredients: [],
              instructions: [],
              recommended: [],
              suggested: [],
              bot_message: "Here is the recipe for your " + dish,
              user_message: "",
              review_message: "",
              end_message: "",
            },
          ]);
          //   setIsLoading(false);
        });
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
              bot_message: aimsg,
              user_message: "",
              review_message: "",
              end_message: "",
            },
          ]);
          
          //   setIsLoading(false);
        });
      }
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
    } else if (
      aimsg ==
      "I have prepared your list of items, ready to be added to your cart. You can add them by clicking 'Add To Cart.'"
    ) {
      setTimeout(() => {
        setUserMessages((prevMessages) => [
          ...prevMessages,
          {
            dishName: "",
            ingredients: [],
            instructions: [],
            recommended: [],
            suggested: [],
            reviewItems: [],
            totalAmount:0,
            bot_message: "",
            user_message: "",
            review_message: aimsg,
          },
        ]);
        //   setIsLoading(false);
      });
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
            bot_message: aimsg,
            user_message: "",
            review_message: "",
          },
        ]);
        //   setIsLoading(false);
      });
    }
  };

  //handle new chat
  const handleNewChat = () => {
    setUserMessages([
      {
        dishName: "",
        ingredients: [],
        instructions: [],
        recommended: [],
        suggested: [],
        bot_message:
          "Hi I’m HEB's MAIA but you can call me Maia, let’s cook delicious meals together! ",
        user_message: "",
        review_message: "",
      },
    ]);
  };

  const updateReviewItems = (id, items, total) => {
    const updatedMessages = userMessages.map((msg, i) =>  id === i? {...msg, reviewItems: items, totalAmount:total} : msg
  );
    setUserMessages(updatedMessages);
  }

  // returning display
  return (
    <div
      style={{
        ...styles.modalWindow,
        ...{ opacity: props.visible ? "1" : "0" },
      }}
    >
      <div className="bg-[#d5281d] flex">
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
        {messages.map((msg, index) => (
        <div key={index}>
          {msg.user_message !== "" ? (
            // user normal message
            //   <div className="bg-[#d5281d] p-[10px] h-fit ml-[45%] rounded-md mt-[5px] mr-[5%] max-w-[50%] text-[#ffffff] text-[13px] font-sans">
            //     <p>{msg.user_message}</p>
            //   </div>
            <div className="bg-[#d5281d] p-[10px] h-fit ml-[45%] rounded-md mt-[5px] mr-[5%] max-w-[50%] text-[#ffffff] text-[13px] font-sans">
              <p className="mb-[0px]">{msg.user_message}</p>
            </div>
          ) : "" ||
            (msg.bot_message !== "" &&
              msg.recommended.length === 0 &&
              msg.suggested.length === 0) ? (
            // bot normal message

            <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
              <img
                className="img w-auto h-[30px] flex flex-col ml-[3%]"
                src="src/assets/img/maia-icon.png"
                alt="MAIA"
              />
              <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                <p className="mb-[0px]">{msg.bot_message}</p>
              </div>
            </div>
          ) : "" || msg.dishName !== "" ? (
            <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
              <img
                className="img w-auto h-[30px] flex flex-col ml-[3%]"
                src="src/assets/img/maia-icon.png"
                alt="MAIA"
              />

              <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                <p className="text-sm uppercase font-bold mb-[0px]">
                  {msg.dishName}
                </p>
                <p className="font-semibold mt-[10px] mb-[0px]">
                  Ingredients
                </p>
                <ul className="list-disc ml-[-10px] mt-[10px]">
                  {/* {console.log(msg.ingredients)} */}
                  {msg.ingredients.map((ingList, index) => (
                    <li key={index}>{ingList}</li>
                  ))}
                </ul>
                <p className="font-semibold mt-[10px] mb-[0px]">
                  Instructions
                </p>
                <ol className="list-decimal ml-[-10px] mt-[10px]">
                  {msg.instructions.map((insList, index) => (
                    <li key={index}>{insList}</li>
                  ))}
                </ol>
              </div>
            </div>
          ) : "" || msg.recommended.length > 0 ? (
            <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
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
                      <input
                        type="checkbox"
                        name={data.productName}
                        data-price={data.productPrice}
                        checked={checkedItems.includes(data)}
                        onChange={() => handleCheckedItem(data)}
                      />
                    </div>
                    <div className="w-[75%] mr-[5px]">
                      <p className="mb-[0px]">
                        <b className="mb-[0px]">{data.quantity}x </b>
                        {data.productName}
                      </p>
                    </div>
                    <div className="w-[30%] content-center justify-center text-right mr-1">
                      <p className="font-bold mb-[0px]">
                        ${Number(data.finalPrice).toFixed(2)}
                      </p>
                      {data.quantity > 1 && (
                        <p className="text-[9px] mb-[0px]">
                          ${Number(data.productPrice).toFixed(2)} ea.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : "" || msg.suggested.length > 0 ? (
            <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
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
                    <div className="w-[10%] mr-[5%] content-center">
                      <input
                        type="checkbox"
                        name={data.productName}
                        data-price={data.productPrice}
                        checked={checkedItems.includes(data)}
                        onChange={() => handleCheckedItem(data)}
                      />
                    </div>
                    <div className="w-[70%] mr-[5px]">
                      <p className="mb-[0px]">
                        <b className="mb-[0px]">{data.quantity}x </b>{" "}
                        {data.productName}
                      </p>
                    </div>

                    <div className="w-[20%] content-center mr-[5px]">
                      <p className=" font-bold mb-[0px]">
                        {isNaN(Number(data.productPrice))
                          ? data.productPrice
                          : `$${parseFloat(data.productPrice).toFixed(2)}`}
                      </p>
                      {/* <p className="text-[9px] mb-[0px]">
                        ${data.productPrice}
                      </p> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : "" || msg.review_message !== "" ? (
            <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
              <img
                className="img w-auto h-[30px] content-end ml-[3%]"
                src="src/assets/img/maia-icon.png"
                alt="MAIA"
              />
              <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                <p className="text-sm mb-[15px]">{msg.review_message}</p>
                {msg.reviewItems.map((item) => (
                  <div className="bg-white w-[100%] rounded-sm mt-[5px] flex p-[5px]">
                    <div className="w-[10%] mr-[5%] content-center">
                    <b className="mb-[0px]">{item.quantity}x</b>
                    </div>
                    <div className="w-[70%] mr-[5px]">
                      <p className="mb-[0px]">
                        {" "}
                        {item.productName}
                      </p>
                    </div>
                    {/* <div className="w-[20%] content-center font-bold mr-[5px]">
                      <p className="mb-[0px]">
                        ${handleGetAmount(item.productPrice, item.quantity)}
                      </p>
                    </div> */}
                    <div className="w-[30%] content-center justify-center text-right mr-1">
                      <p className="font-bold mb-[0px]">
                        $
                        {item.finalPrice || item.productPrice}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[9px] mb-[0px]">
                          ${Number(item.productPrice).toFixed(2)} ea.
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="content-center">
                  <button
                    className="bg-[#d5281d] border-1 font-bold text-[#FFF9ED] text-sm hover:bg-[#811911] hover:border-[#811911] w-[90%] m-[10px] rounded-none mb-[0px]"
                    onClick={() => {
                      handleAddToCart(checkedItems), handleSendShoppingCart();
                    }}
                  >
                    Add to cart &nbsp; ${msg.totalAmount}
                  </button>
                </div>
              </div>
            </div>
          ) : "" || msg.end_message !== "" ? (
            <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
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
                    className="bg-[#d5281d] font-bold border-1 mb-[0px] text-[#FFF9ED] text-sm hover:bg-[#811911] hover:border-[#811911] w-[90%] m-[10px] rounded-none"
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
        </div>
        ))}
        {userMessages.map((msg, index) => (
          <div key={index}>
            {msg.user_message !== "" ? (
              // user normal message
              //   <div className="bg-[#d5281d] p-[10px] h-fit ml-[45%] rounded-md mt-[5px] mr-[5%] max-w-[50%] text-[#ffffff] text-[13px] font-sans">
              //     <p>{msg.user_message}</p>
              //   </div>
              <div className="bg-[#d5281d] p-[10px] h-fit ml-[45%] rounded-md mt-[5px] mr-[5%] max-w-[50%] text-[#ffffff] text-[13px] font-sans">
                <p className="mb-[0px]">{msg.user_message}</p>
              </div>
            ) : "" ||
              (msg.bot_message !== "" &&
                msg.recommended.length === 0 &&
                msg.suggested.length === 0) ? (
              // bot normal message

              <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
                <img
                  className="img w-auto h-[30px] flex flex-col ml-[3%]"
                  src="src/assets/img/maia-icon.png"
                  alt="MAIA"
                />
                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                  <p className="mb-[0px]">{msg.bot_message}</p>
                </div>
              </div>
            ) : "" || msg.dishName !== "" ? (
              <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
                <img
                  className="img w-auto h-[30px] flex flex-col ml-[3%]"
                  src="src/assets/img/maia-icon.png"
                  alt="MAIA"
                />

                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                  <p className="text-sm uppercase font-bold mb-[0px]">
                    {msg.dishName}
                  </p>
                  <p className="font-semibold mt-[10px] mb-[0px]">
                    Ingredients
                  </p>
                  <ul className="list-disc ml-[-10px] mt-[10px]">
                    {/* {console.log(msg.ingredients)} */}
                    {msg.ingredients.map((ingList, index) => (
                      <li key={index}>{ingList}</li>
                    ))}
                  </ul>
                  <p className="font-semibold mt-[10px] mb-[0px]">
                    Instructions
                  </p>
                  <ol className="list-decimal ml-[-10px] mt-[10px]">
                    {msg.instructions.map((insList, index) => (
                      <li key={index}>{insList}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : "" || msg.recommended.length > 0 ? (
              <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
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
                        <input
                          type="checkbox"
                          name={data.productName}
                          data-price={data.productPrice}
                          checked={checkedItems.includes(data)}
                          onChange={() => handleCheckedItem(data)}
                        />
                      </div>
                      <div className="w-[75%] mr-[5px]">
                        <p className="mb-[0px]">
                          <b className="mb-[0px]">{data.quantity}x </b>
                          {data.productName}
                        </p>
                      </div>
                      <div className="w-[30%] content-center justify-center text-right mr-1">
                        <p className="font-bold mb-[0px]">
                          ${Number(data.finalPrice).toFixed(2)}
                        </p>
                        {data.quantity > 1 && (
                          <p className="text-[9px] mb-[0px]">
                            ${Number(data.productPrice).toFixed(2)} ea.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : "" || msg.suggested.length > 0 ? (
              <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
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
                      <div className="w-[10%] mr-[5%] content-center">
                        <input
                          type="checkbox"
                          name={data.productName}
                          data-price={data.productPrice}
                          checked={checkedItems.includes(data)}
                          onChange={() => handleCheckedItem(data)}
                        />
                      </div>
                      <div className="w-[70%] mr-[5px]">
                        <p className="mb-[0px]">
                          <b className="mb-[0px]">{data.quantity}x </b>{" "}
                          {data.productName}
                        </p>
                      </div>

                      <div className="w-[20%] content-center mr-[5px]">
                        <p className=" font-bold mb-[0px]">
                          {isNaN(Number(data.productPrice))
                            ? data.productPrice
                            : `$${parseFloat(data.productPrice).toFixed(2)}`}
                        </p>
                        {/* <p className="text-[9px] mb-[0px]">
                          ${data.productPrice}
                        </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : "" || msg.review_message !== "" ? (
              <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
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
                      <b className="mb-[0px]">{item.quantity}x</b>
                      </div>
                      <div className="w-[70%] mr-[5px]">
                        <p className="mb-[0px]">
                          {" "}
                          {item.productName}
                        </p>
                      </div>
                      {/* <div className="w-[20%] content-center font-bold mr-[5px]">
                        <p className="mb-[0px]">
                          ${handleGetAmount(item.productPrice, item.quantity)}
                        </p>
                      </div> */}
                      <div className="w-[30%] content-center justify-center text-right mr-1">
                        <p className="font-bold mb-[0px]">
                          $
                          {handleGetAmount(
                            item.finalPrice || item.productPrice
                          ).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[9px] mb-[0px]">
                            ${Number(item.productPrice).toFixed(2)} ea.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="content-center">
                    <button
                      className="bg-[#d5281d] border-1 font-bold text-[#FFF9ED] text-sm hover:bg-[#811911] hover:border-[#811911] w-[90%] m-[10px] rounded-none mb-[0px]"
                      onClick={() => {
                        handleAddToCart(checkedItems), handleSendShoppingCart(),updateReviewItems(index,checkedItems,totalAmount.toFixed(2))
                      }}
                    >
                      Add to cart &nbsp; ${totalAmount.toFixed(2)}
                    </button>
                  </div>
                </div>
              </div>
            ) : "" || msg.end_message !== "" ? (
              <div className=" mt-[5px] mr-[15%] max-w-[90%] flex">
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
                      className="bg-[#d5281d] font-bold border-1 mb-[0px] text-[#FFF9ED] text-sm hover:bg-[#811911] hover:border-[#811911] w-[90%] m-[10px] rounded-none"
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
          //   onKeyDown={handleKeyPress}
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
