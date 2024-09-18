import axios from "axios";

const sendMessage = "http://localhost:8081/orders/new/chat";

export const chatMessage = (message) => axios.get(sendMessage,message);