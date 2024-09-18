import Header from "../components/Header";
import '../assets/Style.css';

export default function() {
    return(
        <>
            <div data-testid="home-page">
                <div className="w-[100%] h-[55vh] bg-[#e6e6e6] justify-center flex align-text-top">
                    <div>
                        <div className=" w-[100%] mt-10 top-[100%] align-text-top md:-[50%] max-w-full h-fit text-[#000000] p-4 opacity-80 overflow-hidden ">
                            <div className="ml-[50px] mr-[50px] text-center">
                                <h1 className="font-sans text-5xl tracking-wider">HEB MAIA</h1> 
                                <p className="mt-[20px] tracking-wider text-lg">HEB MAIA is an artificial Intelligent chatbot powered by ChatGPT </p>
                                <p className="tracking-wider text-lg">OpenAI API, designed to assist with all your recipe requests. HEB </p>
                                <p className="tracking-wider text-lg">MAIA is here to provide time saving and convenient shopping </p>
                                <p className="tracking-wider text-lg">experience.</p>
                                <button className="mt-[15px] bg-[#d51408] hover:bg-[#a00e05] border-double hover:border-double border-4 border-[#ffffff] font-sans tracking-widest text-[#ffffff] rounded-3xl" >TRY HEB MAIA</button>
                                <div className="w-1/2"><img className="w-[100%] h-[85%] inline ml-[40px] mr-[40px]" src="../../img/about.png" alt="img"/></div>
                                <div className="w-1/2">
                                <div class="ml-[75px] pr-[130px] text-left text-white">
                                    <h2 className="tracking-[5px]">MINNIE'S BAKERY</h2>
                                    <h6 className="tracking-[5px]"><b> </b></h6>     
                                    <p className="tracking-[2px] mt-[30px] pr-[50px]">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. </p>                              
                                    <p className="tracking-[2px] mt-[30px] pr-[50px]">Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="bg-[#ffffff] pt-[50px] pb-[20px]">
                    <div className="text-[#333] font-sans text-4xl pb-[70px]">ABOUT</div>
                    <div className="flex">
                        <div className="w-1/2"><img className="w-[100%] h-[85%] inline ml-[40px] mr-[40px]" src="../../img/about.png" alt="img"/></div>
                        <div className="w-1/2">
                            <div class="ml-[75px] pr-[130px] text-left">
                                <h2 className="tracking-[5px]">MINNIE'S BAKERY</h2>
                                <h6 className="tracking-[5px]"><b> WE BAKE EVERY ITEM FROM THE CORE OF OUR HEARTS</b></h6>     
                                <p className="tracking-[2px] mt-[30px] pr-[50px]">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. </p>                              
                                <p className="tracking-[2px] mt-[30px] pr-[50px]">Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
                            </div>
                        </div>
                    </div>
                </div> */}
                <div class="max-w-sm w-full lg:max-w-full lg:flex ">
                    <div class="border-r border-b border-l  border-white lg:border-l-0 lg:border-t lg:border-white bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div class="mb-8">
                        <p class="text-sm  flex items-center text-white">
                            <svg class="fill-current text-white w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                            Members only
                        </p>
                        <div class="font-bold text-xl mb-2 text-white">Can coffee make you a better developer?</div>
                        <p class="text-white text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
                        </div>
                        <div class="flex items-center">
                        {/* <img class="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/> */}
                        <div class="text-sm">
                            <p class="text-white leading-none">Jonathan Reinink</p>
                            <p class="text-white">Aug 18</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <Header/>
        </>
    )
}