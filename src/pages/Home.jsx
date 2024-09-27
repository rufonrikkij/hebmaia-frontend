import Header from "../components/Header";
import "../assets/Style.css";
import ChatWidget from "../components/ChatWidget";

export default function () {
  return (
    <>
      <div data-testid="home-page" className="overflow-hidden">
        <div className="w-full h-[56vh] mt-[40px]  bg-[#e6e6e6] justify-center flex  align-text-top">
          <div className=" w-[100%] mt-10 top-[100%] align-text-top md:-[50%] max-w-full h-fit text-[#000000] p-4  overflow-hidden ">
            <div className="ml-[50px] mr-[50px] text-center">
              <h1 className="font-sans text-5xl tracking-wider opacity-80">
                HEB MAIA
              </h1>
              <p className="mt-[20px] tracking-wider text-base opacity-80">
                HEB MAIA is an artificial Intelligent chatbot powered by ChatGPT{" "}
              </p>
              <p className="tracking-wider text-base mt-[-10px] opacity-80">
                OpenAI API, designed to assist with all your recipe requests.
                HEB{" "}
              </p>
              <p className="tracking-wider text-base mt-[-10px] opacity-80">
                MAIA is here to provide time saving and convenient shopping{" "}
              </p>
              <p className="tracking-wider text-base mt-[-10px] opacity-80">
                experience.
              </p>
              <button className="mt-[5px] bg-[#d51408] hover:bg-[#a00e05] border-double hover:border-double border-4 border-[#ffffff] font-sans tracking-widest text-[#ffffff] rounded-3xl">
                TRY HEB MAIA
              </button>
            </div>
          </div>
        </div>
        <div className=" h-[45vh] mt-[20px] ml-[30px] mr-[100px]  bg-[#d51408] justify-center flex overflow-visible align-text-top border-double hover:border-double border-[40px] border-[#ffffff]">
          <div className=" w-[100%] top-[100%] align-text-top md:-[50%] max-w-full h-fit text-[#000000] p-4 overflow-hidden ">
            <div className=" text-white text-start ml-[10px] mr-[10px]">
              <h1 className="font-sans text-xl tracking-wider">SERVICES</h1>
              <p className="mt-[20px] tracking-widest text-base">
                HEB MAIA offers convenient shopping by providing products
                tailored to the customer needs. HEB will be able to products by
                recommending relevant or similar items to the purchase and
                upsell products by convincing customers to upgrade or purchase
                more of a given item .
              </p>
            </div>
          </div>
        </div>
      </div>

      <Header />
      <ChatWidget />
    </>
  );
}
