import React from "react";
import DndExample from "../components/DndExample/DndExample";
import Sidebar from "@/components/Sidebar/page";
import HeaderInfo from "../components/HeaderInfo/page";
import Filter from "@/components/Filter/page";

const Home = () => {
  return (
    <div className="w-full flex  h-screen bg-[#F7F7F7] mx-auto relative gap-[16px]">
      <div>
        <Sidebar />
      </div>
      <div>
        <div className="  flex-1">
          <div className="flex flex-row justify-between items-center p-0  w-full h-[58px]">
            {/* Good morning, Joe! */}
            <div className=" h-[58px]   text-[#080808] text-[48px] font-semibold leading-[58px] font-barlow">
              Good morning, Joe!
            </div>

            {/* Frame 336 */}
            <div className="flex flex-row items-center p-0 gap-[8px] w-[157px] h-[24px]">
              {/* Help & feedback */}
              <div className="w-[125px] h-[19px] text-[#080808] text-[16px] font-normal leading-[19px] font-inter">
                Help & feedback
              </div>
            </div>
          </div>
          <HeaderInfo />
          <Filter />
          <DndExample />
        </div>
      </div>
    </div>
  );
};

export default Home;
