import { styles } from "./../styles";
import '../../../assets/Style.css';
// import { FaBeer } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useRef} from "react";
import {chatMessage} from "../../../service/ChatAIService";

//for displaying the model view/Window
function ModalWindow(props) {
    const [messages, setMessages] = useState([]); 

    const [isTyping, setIsTyping] = useState(false);
    const [response, setResponse] = useState(null);

    
    let totalAmount = 0;
    const chatContainerRef = useRef(null);
    const [userMessages, setUserMessages] = useState([]);
    const [newUserMessage, setNewUserMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [checkedItems, setCheckedItems] = useState([]);

    const [message, setMessage] = useState('');


    // useEffect(() => {
    //     aiChat().then((response) => {
    //         setMessages(response.data);
    //     })
    // },[])

    useEffect(() => {
        setUserMessages((prevChatLog) => [
          ...prevChatLog,
          //bot msg data
          {
            recipe: [],
            recommended:[],
            suggested:[],
            bot_message: "That’s a great choice! Let’s make a delicious Chicken Fajita Pasta together. Here is a simple recipe for you to enjoy!",
            user_message:"",
            cartbot_message: "",
          },
          //recipe data
          {
            recipe: [
            {
                name:"Chicken  Fajita  Pasta",
                ingredients:[
                    {content:"1/4 cup Lime(s), juice"},
                    {content:"1 large red bell pepper, cored, seeded and thin sliced"},
                    {content:"16 oz Bucatini pasta"},
                    {content:"2 tbsp Olive oil"},
                    {content:"1 cup White onion(s), thinly sliced"},
                    {content:"1 3/4 lb Seasoned chicken thighs for fajitas, diced small or into bite sized pieces"},
                    {content:"1/2 cup Reduced sodium chicken broth"},
                    {content:"2 tbsp Dried chives, plus more as needed"},
                    {content:"1 cup Manchego cheese, shredded or grated"},
                ],
                instructions:[
                    {content:"Bring a large pot of water to a boil. Cook pasta according to package instructions, drain and set aside. Drizzle pasta with olive oil to keep from sticking if desired."},
                    {content:"In a large non-stick skillet add oil and allow to get hot. Add peppers and onions"},
                    {content:"Add chicken and sauté for an additional 8 to 10 minutes until chicken just starts to get crispy."},
                    {content:"Add chicken broth, bring to a simmer then add pasta, chives, cheese and lime juice. Remove from heat and toss to coat."},
                    {content:"Season to taste, garnish with more cheese as desired."},
                ]
            }
            ],
            recommended:[],
            suggested:[],
            bot_message: "",
            user_message:"",
            cartbot_message: "",
          },
          //recommended data
          {
            recipe: [],
            recommended:[
                {product: "H-E-B Fresh Lime (1 lb)", quantity:2,price:0.20},
                {product: "Fresh Red Bell Pepper (1 lb)", quantity:1,price:1.54},
                {product: "Central Market Organic Bucatini Bronze Cut Pasta (16 oz)", quantity:1,price:2.48},
                {product: "H-E-B Olive Oil (16 oz)", quantity:1,price:8.61},
                {product: "H-E-B Fresh White Onion (5ct)", quantity:1,price:0.86},
                {product: "H-E-B Seasoned Boneless Skinless Chicken Thighs for Fajitas (Avg. 2.25 lbs)", quantity:2,price:8.17},
                {product: "H-E-B Dried Chives (0.02 oz)", quantity:2,price:2.27},
                {product: "Don Juan 6 Month Aged Manchego Cheese (0.4 lb)", quantity:1,price:8.14},
                {product: "H-E-B Reduced Sodium Chicken Broth (32 oz)", quantity:1,price:0.86},
            ],
            suggested:[],
            bot_message: "That’s a great choice! Let’s make a delicious Chicken Fajita Pasta together. Here is a simple recipe for you to enjoy!",
            user_message: "",
            cartbot_message: "",
          },
          //suggested data
          {
            recipe: [],
            recommended:[],
            suggested:[
                {product: "Stivali Sweet Rosso 750 ml", quantity:1,price:11.42, isChecked: false},
                {product: "Apothic Red Blend Wine 750 ml", quantity:1,price:10.38, isChecked: false},
            ],
            bot_message: "Heres my suggested products, you can select items you want to include in your shopping list. Let me know if you’re done selecting items.",
            user_message: "",
            cartbot_message: "",
          },
          //bot msg data
          {
            recipe: [],
            recommended:[],
            suggested:[],
            bot_message: "",
            user_message:"",
            cartbot_message: "I have here your list of items ready to be added into your cart. You can add the items by clicking Add To Cart",
          },
        ]);

       
      }, []);

    const productTotal = (quantity,price) => {
        const total = price * quantity;
        return total;
    }
   
    useEffect(() => {
        userMessages.map(fields => {
            setCheckedItems(fields.suggested);
        })
        // Automatically check all items initially
        // setCheckedItems(userMessages.suggested);
      }, []);

    const handleCheckboxChange = (event) => {
        const { name, checked, value, dataset } = event.target;
        const price = dataset.price;
        setCheckedItems((prev) =>
          checked
            ? [...prev, { name, value, price}]
            : prev.filter((item) => item.name !== name)
        );
      };

  
    useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    }, [userMessages]);

    const handleSendMessage = () => {
        if (newUserMessage.trim()){
            setUserMessages([
                ...userMessages,
                {
                    recipe: [],
                    recommended:[],
                    suggested:[],
                    bot_message: "",
                    user_message:newUserMessage,
                  },
              ]);
              setNewUserMessage("");
              sendUserMessage(newUserMessage);
        }
    }

   

    const sendUserMessage = (userMessage) => {
        setIsLoading(true);
        setTimeout(() => {
        //   setMessages([
        //     ...messages,
        //     {
        //         recipe: [],
        //         recommended:[],
        //         suggested:[],
        //         bot_message: "",
        //         user_message:newUserMessage,
        //       },
        //     {
        //         recipe: [],
        //         recommended:[],
        //         suggested:[],
        //         bot_message: "That’s a great choice! Let’s make a delicious Chicken Fajita Pasta together. Here is a simple recipe for you to enjoy!",
        //         user_message:"",
        //       },
        //   ]);
          console.log(newUserMessage)
          chatMessage(newUserMessage).then((response) => {
            setUserMessages((prevMessages) => [
                ...prevMessages,
                response.data,
            ])
          })
        //   setUserMessages((prevMessages) => [
        //     ...prevMessages,
        //     {
        //         recipe: [],
        //         recommended:[],
        //         suggested:[],
        //         bot_message: "That’s a great choice! Let’s make a delicious Chicken Fajita Pasta together. Here is a simple recipe for you to enjoy!",
        //         user_message:"",
        //       },
        //   ]);
          setIsLoading(false);
        }, 2000);
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        //   alert('Enter pressed')
            handleSendMessage
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
                <img className='img w-auto h-[50px]' src="src/assets/img/chat-icon.png" alt="MAIA"/>
                <p className="font-sans font text-sm text-[#ffffff] font-bold mt-[15px]">HEB.MAIA</p>
            </div>
            
            <div className="bg-white overflow-y-scroll h-[77%] p-[10px]" ref={chatContainerRef}>
                {/* paste here loop for messages */}
                {userMessages.map((msg,index) =>(
                    <div key={index}>
                        {msg.user_message !== "" ?
                        // user normal message
                            <div className="bg-[#d5281d] p-[10px] h-fit ml-[45%] rounded-md mt-[5px] mr-[5%] max-w-[50%] text-[#ffffff] text-[13px] font-sans">
                                <p>{msg.user_message}</p>
                            </div>
                            : '' ||
                         msg.bot_message !== "" && msg.recommended.length === 0 && msg.suggested.length === 0 ?
                            // bot normal message
                            <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                                <img className='img w-auto h-[30px] flex flex-col ml-[3%]' src="src/assets/img/maia-icon.png" alt="MAIA" />
                                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                                    <p>{msg.bot_message}</p>
                                </div>
                            </div>
                            : '' ||
                         msg.recipe.length > 0 ?
                            <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                                <img className='img w-auto h-[30px] flex flex-col ml-[3%]' src="src/assets/img/maia-icon.png" alt="MAIA" />
                                { msg.recipe.map((data) =>(
                                    <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                                        <p className="text-sm uppercase font-bold">{data.name}</p>
                                        <p className="font-semibold mt-[10px]">Ingredients</p>
                                        <ul className="list-disc ml-[15px]">
                                            {data.ingredients.map(list => (
                                                <li>{list.content}</li>
                                            ))}
                                        </ul>
                                        <p className="font-semibold mt-[10px]">Instructions</p>
                                        <ol className="list-decimal ml-[15px]">
                                            {data.instructions.map(list => (
                                                <li>{list.content}</li>
                                            ))}
                                        </ol>
                                    </div>
                                ))}
                            </div>
                            : '' ||
                         msg.recommended.length > 0 ?
                            <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                                <img className='img w-auto h-[30px] content-end ml-[3%]' src="src/assets/img/maia-icon.png" alt="MAIA" />
                                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">          
                                    <p className="mb-[15px]">{msg.bot_message}</p>
                                    {msg.recommended.map(data => (
                                        <div className="bg-white rounded-sm w-[100%] mt-[5px] flex p-[5px]">
                                            <div className="w-[5%] mr-[5%] content-center">
                                                <input type="checkbox" defaultChecked={true} />
                                            </div>
                                            <div className="w-[65%] mr-[5px]">
                                                <p><b>{data.quantity}x </b>{data.product}</p>   
                                            </div>
                                            <div className="w-[30%] content-center font-bold mr-[5px]">
                                                <p>$ {productTotal(data.quantity,data.price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            : '' ||
                         msg.suggested.length > 0 ?
                            <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                                <img className='img w-auto h-[30px] content-end ml-[3%]' src="src/assets/img/maia-icon.png" alt="MAIA" />
                                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                                    <p className="mb-[15px]">{msg.bot_message}</p>
                                    {msg.suggested.map((data,index) => (
                                        <div key={index} className="bg-white rounded-sm w-[100%] mt-[5px] flex p-[5px]">
                                            <div className="w-[10%] mr-[5%] content-center">
                                                <input
                                                type="checkbox"
                                                name={data.product}
                                                value={data.quantity}
                                                data-price={data.price}
                                                checked={checkedItems.some((checkedItem) => checkedItem.name === data.product)}
                                                onChange={handleCheckboxChange}
                                                />
                                            </div>
                                            <div className="w-[70%] mr-[5px]">
                                                <p><b>{data.quantity}x </b> {data.product}</p>
                                            </div>
                                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                                <p>${productTotal(data.quantity,data.price)}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {/* <div>
                                        <h3>Checked Items:</h3>
                                        <ul>
                                        {checkedItems.map((item) => (
                                            <li key={item.quantity}>{item.value}x{item.name}x{item.price}</li>
                                        ))}
                                        </ul>
                                    </div>
                                    */}
                                </div>
                            </div>
                            : '' ||
                         msg.cartbot_message !== "" ?
                            <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                                <img className='img w-auto h-[30px] content-end ml-[3%]' src="src/assets/img/maia-icon.png" alt="MAIA" />
                                <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-md text-[#000000] text-[13px] font-sans">
                                    
                                <p className="text-sm mb-[15px]">{msg.cartbot_message}</p>
                                    {checkedItems.map((item) => (
                                        
                                        <div className="bg-white w-[100%] rounded-sm mt-[5px] flex p-[5px]">
                                            <div className="w-[10%] mr-[5%] content-center">
                                                <input type="checkbox" defaultChecked={true} />
                                            </div>
                                            <div className="w-[70%] mr-[5px]">
                                                <p><b>{item.value}x</b> {item.name}</p>
                                            </div>
                                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                            <p>${productTotal(item.value,item.price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="content-center">
                                        <button className="bg-[#d5281d] border-1 text-[#FFF9ED] text-sm hover:bg-[#811911] hover:border-[#811911] w-[90%] m-[10px] rounded-none">Add to cart &nbsp; ${totalAmount}</button> 
                                    </div>
                                    
                                </div>
                            </div>
                            : ''
                        }
                    </div>
                ))}
                {/* {isTyping && <div className="typing-indicator">Typing...</div>}
                {response && <div className="response">{JSON.stringify(response)}</div>} */}
            </div>

            <div className="bg-[#e6e6e6] absolute flex inset-x-0 bottom-0 p-[10px]">
                <input 
                    type="text"  
                    // class={`form-control ${errors.name ? 'is-invalid': ''}`}
                    id="userInput"
                    // min={data.min}
                    placeholder = " Type a message..."
                    value={newUserMessage}
                    onChange={handleInputChange}
                    className="rounded-xl w-[90%] text-sm p-[10px]"
                    // onChange={(e) => setName(e.target.value)}
                    // data-testid="name-field"
                    onKeyDown={handleKeyPress}
                    tabIndex="0"
                    >
                </input>
           <img onClick={handleSendMessage} className='img w-auto h-[30px] ml-[5%] mt-[5px]' src="src/assets/img/send-button.png" alt="send" />
                {/* <BsSendFill className="w-auto h-[30px] ml-[2%] mt-[5px]" /> */}
                {/* <FontAwesomeIcon icon="fa-solid fa-paper-plane-top" /> */}
                {/* <i class="fa-solid fa-paper-plane-top"></i> */}
                {/* <i class="fa-solid fa-paper-plane-top"></i> */}
            </div>
           
        </div>
    );
}
export default ModalWindow;