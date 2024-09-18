import { styles } from "./../styles";
import '../../../assets/Style.css';

const userChat = ({text}) =>{

    return(
    <div className="bg-[#d5281d] p-[10px] h-fit ml-[45%] rounded-md mt-[5px] mr-[5%] max-w-[50%] text-[#ffffff] text-sm">
        <div>{console.log(text)}</div>
    </div>
    )
}


export default userChat;