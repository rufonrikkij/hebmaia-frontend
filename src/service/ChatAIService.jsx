import axios from "axios";

const sendMessage = "http://localhost:8081/csa/chat";
// const api = "httlocalhost:8083/api/products/category/1"

// export const chatMessage = (userMsg) => axios.get(sendMessage,userMsg);
export const chatMessage = (asd) => axios.get(sendMessage + "?message=" + asd);
