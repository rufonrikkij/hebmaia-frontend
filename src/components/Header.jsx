import '../assets/Style.css';
import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import ChatWidget from '../components/ChatWidget'
import { Widget, addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

export default function Header(){

    useEffect(() => {
        addResponseMessage('Welcome to this awesome chat!');
      }, []);
    
      const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        addResponseMessage(response);
      };

    //navbar data for setting up the nav layout on a loop
    let Links = [
        {name: 'HOME', link:'/home'},
        {name: 'ABOUT', link:'/'},
        {name: 'MENU', link:'/menu2'},
        {name: 'PRODUCTS', link:'/products'},
        {name: 'ORDERS', link:'/orders'}
    ]

    let [isOpen, setIsOpen] = useState(false)
    
    return(
        <>
        <div className="bg-[#ffffff] shadow-md w-full fixed top-0 left-0 overflow-visible">
            <div className="md:px-10  px-7 md:flex justify-between items-center bg-[#ffffff]">
                <div className="flex cursor-pointer items-center">
                    <Link to="/">
                        <img
                            className="img w-auto h-[40px] ml-9"
                            src="src/assets/img/maia-logo.png"
                        />
                    </Link>
                </div>
                <ul className={`md:flex ml-20 cursor-pointer pt-3 pl-9 md:pl-0 md:items-center md:pb-0 pd-12 md:z-auto z-[-1] left-0 w-full transition-all duration-500 ease-in mt-[7px] `}>
                    <li><p className="font-sans ml-5 mr-5 font text-xl text-[#000000] font-normal">ABOUT</p></li>
                    <li><p className="font-sans ml-5 mr-5 font text-xl text-[#000000] font-normal">SERVICES</p></li>
                    <li><Link to="/shoppingcart"><p className="font-sans ml-5 mr-5 font text-xl text-[#000000] font-normal">SHOPPING CART</p></Link></li>
                </ul>
            </div>
        </div>
        {/* <ChatWidget/> */}
            {/* <Widget
               handleNewUserMessage = {handleNewUserMessage}
            /> */}
        </>
    )
}