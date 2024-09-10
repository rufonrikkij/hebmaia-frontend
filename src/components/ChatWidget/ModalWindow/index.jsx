import { styles } from "./../styles";
import '../../../assets/Style.css';
// import { FaBeer } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//for displaying the model view/Window
function ModalWindow(props) {
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
            
            <div className="bg-white overflow-y-scroll h-[77%] p-[10px]">
                <div className="bg-[#d5281d] p-[10px] h-fit ml-[45%] rounded-[5] mt-[5px] mr-[5%] max-w-[50%] text-[#ffffff] text-sm">
                    <p>user message template sample entry</p>
                </div>
                <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                    <img className='img w-auto h-[30px] flex flex-col ml-[3%]' src="src/assets/img/maia-icon.png" alt="MAIA" />
                    <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-[5] text-[#000000] text-sm">
                        <p>ai message template sample entry</p>
                    </div>
                </div>
                {/* Recipe template START*/}
                <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                    <img className='img w-auto h-[30px] flex flex-col ml-[3%]' src="src/assets/img/maia-icon.png" alt="MAIA" />
                    <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-[5] text-[#000000] text-sm">
                        <p className=" text-base uppercase font-bold">recipe template</p>
                        <p className="font-semibold mt-[10px]">Ingredients</p>
                        <ul className="list-disc ml-[15px]">
                            <li> list of ingredients 1 list of ingredients 1</li>
                            <li> list of ingredients 2</li>
                        </ul>
                        <p className="font-semibold mt-[10px]">Instructions</p>
                        <ol className="list-decimal ml-[15px]">
                            <li> list of instructions 1 list of instructions 1</li>
                            <li> list of instructions 1</li>
                        </ol>
                    </div>
                </div>
                {/* Recipe template END*/}
                {/* Recommended product template START*/}
                <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                    <img className='img w-auto h-[30px] content-end ml-[3%]' src="src/assets/img/maia-icon.png" alt="MAIA" />
                    <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-[5] text-[#000000] text-sm">
                        
                       
                        <div className="bg-white w-[100%] mt-[5px] flex p-[5px]">
                            <div className="w-[10%] mr-[5%] content-center">
                                <input type="checkbox" defaultChecked={true} />
                            </div>
                            <div className="w-[70%] mr-[5px]">
                                <p className="text-sm">H‑E‑B Real Mayonnaise (11 oz)</p>
                            </div>
                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                <p>$11.42</p>
                            </div>
                        </div>
                        <div className="bg-white w-[100%] mt-[5px] flex p-[5px]">
                            <div className="w-[10%] mr-[5%] content-center">
                                <input type="checkbox" defaultChecked={true} />
                            </div>
                            <div className="w-[70%] mr-[5px]">
                                <p className="text-sm">H‑E‑B Real Mayonnaise (11 oz)</p>
                            </div>
                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                <p>$11.42</p>
                            </div>
                        </div>
                        <div className="bg-white w-[100%] mt-[5px] flex p-[5px]">
                            <div className="w-[10%] mr-[5%] content-center">
                                <input type="checkbox" defaultChecked={true} />
                            </div>
                            <div className="w-[70%] mr-[5px]">
                                <p className="text-sm">H‑E‑B Real Mayonnaise (11 oz)</p>
                            </div>
                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                <p>$11.42</p>
                            </div>
                        </div>
                        <div className="bg-white w-[100%] mt-[5px] flex p-[5px]">
                            <div className="w-[10%] mr-[5%] content-center">
                                <input type="checkbox" defaultChecked={true} />
                            </div>
                            <div className="w-[70%] mr-[5px]">
                                <p className="text-sm">H‑E‑B Real Mayonnaise (11 oz)</p>
                            </div>
                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                <p>$11.42</p>
                            </div>
                        </div>
                        <div className="bg-white w-[100%] mt-[5px] flex p-[5px]">
                            <div className="w-[10%] mr-[5%] content-center">
                                <input type="checkbox" defaultChecked={true} />
                            </div>
                            <div className="w-[70%] mr-[5px]">
                                <p className="text-sm">H‑E‑B Real Mayonnaise (11 oz)</p>
                            </div>
                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                <p>$11.42</p>
                            </div>
                        </div>

                        <p className="text-sm mt-[15px]">Here's my recommended products, you can select items you want to include in your shopping list by clicking the box. Let me know if you’re done selecting items.</p>
                        
                    </div>
                </div>
                {/* Recommended product template END*/}

                 {/* Product Review template START*/}
                <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                    <img className='img w-auto h-[30px] content-end ml-[3%]' src="src/assets/img/maia-icon.png" alt="MAIA" />
                    <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-[5] text-[#000000] text-sm">
                        
                    <p className="text-sm mb-[15px]">I have here your list of items ready to be added into your cart. You can add the items by clicking Add To Cart</p>
                       
                        <div className="bg-white w-[100%] mt-[5px] flex p-[5px]">
                            <div className="w-[10%] mr-[5%] content-center">
                                <input type="checkbox" defaultChecked={true} />
                            </div>
                            <div className="w-[70%] mr-[5px]">
                                <p className="text-sm">H‑E‑B Real Mayonnaise (11 oz)</p>
                            </div>
                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                <p>$11.42</p>
                            </div>
                        </div>
                        <div className="bg-white w-[100%] mt-[5px] flex p-[5px]">
                            <div className="w-[10%] mr-[5%] content-center">
                                <input type="checkbox" defaultChecked={true} />
                            </div>
                            <div className="w-[70%] mr-[5px]">
                                <p className="text-sm">H‑E‑B Real Mayonnaise (11 oz)</p>
                            </div>
                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                <p>$11.42</p>
                            </div>
                        </div>
                        <div className="bg-white w-[100%] mt-[5px] flex p-[5px]">
                            <div className="w-[10%] mr-[5%] content-center">
                                <input type="checkbox" defaultChecked={true} />
                            </div>
                            <div className="w-[70%] mr-[5px]">
                                <p className="text-sm">H‑E‑B Real Mayonnaise (11 oz)</p>
                            </div>
                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                <p>$11.42</p>
                            </div>
                        </div>
                        <div className="bg-white w-[100%] mt-[5px] flex p-[5px]">
                            <div className="w-[10%] mr-[5%] content-center">
                                <input type="checkbox" defaultChecked={true} />
                            </div>
                            <div className="w-[70%] mr-[5px]">
                                <p className="text-sm">H‑E‑B Real Mayonnaise (11 oz)</p>
                            </div>
                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                <p>$11.42</p>
                            </div>
                        </div>
                        <div className="bg-white w-[100%] mt-[5px] flex p-[5px]">
                            <div className="w-[10%] mr-[5%] content-center">
                                <input type="checkbox" defaultChecked={true} />
                            </div>
                            <div className="w-[70%] mr-[5px]">
                                <p className="text-sm">H‑E‑B Real Mayonnaise (11 oz)</p>
                            </div>
                            <div className="w-[20%] content-center font-bold mr-[5px]">
                                <p>$11.42</p>
                            </div>
                        </div>

                        <div className="content-center">
                            <button className="bg-[#d5281d] border-1 text-[#FFF9ED] text-sm hover:bg-[#811911] hover:border-[#811911] w-[90%] m-[10px] rounded-none">Add to cart &nbsp; $66.60</button> 
                        </div>
                    </div>
                </div>
                {/* Product Review template END*/}

                {/*Shopping List Link START*/}
                <div className=" mt-[5px] mr-[15%] max-w-[80%] flex">
                    <img className='img w-auto h-[30px] flex flex-col ml-[3%]' src="src/assets/img/maia-icon.png" alt="MAIA" />
                    <div className="bg-[#e6e6e6] p-[10px] h-fit ml-[2%] rounded-[5] text-[#000000] text-sm">
                        <p>Thank you and I'm happy to assist you!</p>
                        <button className="bg-[#d5281d] border-1 text-[#FFF9ED] text-sm hover:bg-[#811911] hover:border-[#811911] w-[90%] m-[10px] rounded-none">View Shopping Cart</button> 
                    </div>
                </div>
                {/*Shopping List Link END */}
            </div>

            <div className="bg-[#e6e6e6] absolute flex inset-x-0 bottom-0 p-[10px]">
                <input 
                    type="text"  
                    // class={`form-control ${errors.name ? 'is-invalid': ''}`}
                    id="userInput"
                    // min={data.min}
                    placeholder = " Type a message..."
                    className="rounded-xl w-[90%] text-sm p-[10px]"
                    // onChange={(e) => setName(e.target.value)}
                    // data-testid="name-field"
                    >
                </input>
                {/* <button className="fit bg-transparent hover:border-none transition-none hover:transition-none"><img className='img w-auto h-[30px] ml-[5%] mt-[5px]' src="src/assets/img/send-button.png" alt="send" /></button> */}
                {/* <BsSendFill className="w-auto h-[30px] ml-[2%] mt-[5px]" /> */}
                <FontAwesomeIcon icon="fa-solid fa-paper-plane-top" />
                {/* <i class="fa-solid fa-paper-plane-top"></i> */}
                {/* <i class="fa-solid fa-paper-plane-top"></i> */}
            </div>
           
        </div>
    );
}
export default ModalWindow;