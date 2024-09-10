import { styles } from "./styles";
import { BsFillChatFill } from "react-icons/bs";
import { useState, useEffect, useRef} from "react";
import ModalWindow from "./ModalWindow"
function ChatWidget() {
    // state variable to track if widget button was hovered on
    const [hovered, setHovered] = useState(false);
    // state variable to track modal visibility
    const [visible, setVisible] = useState(false);
    const widgetRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
          if (widgetRef.current && !widgetRef.current.contains(event.target)) {
            setVisible(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [widgetRef]);
    return (
      <div ref={widgetRef}>
        {/* Chat Button Component */}
        <ModalWindow visible={visible} />
        <div
            onClick={() => setVisible(!visible)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...styles.chatWidget
            }}
        >
          {/* Inner Container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <BsFillChatFill size={20} color="white" /> */}
            {/* Button Text */}
            {/* <span style={styles.chatWidgetText}>Chat Now!!</span> */}
            <img className='img w-auto h-[50px]' src="src/assets/img/maia-icon.png" alt="MAIA"/>
          </div>
        </div>
      </div>
    );
   }
   
   
   export default ChatWidget;