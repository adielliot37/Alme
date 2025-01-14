import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css"; // Modify path as needed
import { useAccount } from "wagmi"; // Ensure wagmi is properly installed and set up
import { RefreshCw } from "react-feather"; // Make sure to install react-feather for icons
import { UserPointsCounterWrap, CounterCard, Counter, DiscountPill } from "../styles/styled.js"
import Image from "next/image";

const Card3 = () => {
  const { isConnected, address } = useAccount();
  const [points, setPoints] = useState(null);

  const fetchPoints = async () => {
    if (isConnected && address) {
      try {
        const response = await fetch(` /api/user/${address}`);
        console.log("card-response:", response);
        console.log("address:", address);
        const data = await response.json();
        console.log("data:", data);
        setPoints(data.totalPts); // Assuming 'totalPts' is the field in your returned json
      } catch (error) {
        console.error("Failed to fetch points:", error);
      }
    }
  };

  useEffect(() => {
    fetchPoints();
  }, [isConnected, address]); // useEffect will trigger when the connected state or address changes

  const handleReloadPoints = () => {
    fetchPoints(); // Re-fetch points when the reload button is clicked
  };

  return (
    <>


      <UserPointsCounterWrap>
        <div className="row align-items-center gy-4 ">
          <div className="col-sm-6">
            <h5 className="mb-4">Welcome to Alme mater</h5>
            <p className="mb-5">Frens of Alme Mater will be airdropped 10% of $ALME’s circulating
              supply on launch based on accumulated Alme Points.</p>
            {/* <button type="button"
              className='custom-btn'>
              Earn More Points 🌟
            </button> */}

            <button
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
              className='custom-btn'
              type="button"
            >
              Earn More Points 🌟
            </button>
            <p className="mt-4">Alme Points' balances will be refreshed every 24 hours</p>
          </div>
          <div className="col-sm-6">
            <CounterCard className="ms-sm-auto me-sm-0 mx-auto">
              <p className="mb-0">Total Available points</p>
              <Counter className="h2 mb-0">
                {points !== null ? points : "0"}
              </Counter>
              <div className="text-center">

              <button
                onClick={handleReloadPoints}
                 className="d-inline-block"
                title="Reload Points"
              >
                <RefreshCw size={24} /> {/* Using React-Feather icon */ }
              </button>
              </div>
              <DiscountPill discountup="true" className='mx-auto'>
                <Image
                  src={require("../assets/images/green-fill-arrow-circle-icon.svg").default}
                  alt="icon"
                  class="pill-icon"
                ></Image>
                20%
              </DiscountPill>

            </CounterCard>
          </div>
        </div>
        <Image src={require("../assets/images/blur-purple-elem-image.png").default} alt="bg elem" className="bg-purple-light"  ></Image>
        <Image src={require("../assets/images/bg-glass-ring-elem.png").default} alt="bg elem" className="bg-elem-1"  ></Image>
        <Image src={require("../assets/images/bg-glass-spring-elem.png").default} alt="bg elem" className="bg-elem-2"  ></Image>
      </UserPointsCounterWrap>


      {/* <div className="w-[70%] bg-white opacity-70 text-left p-4 rounded-lg shadow sm:p-8 mb-[40px]">
      <h3 className="text-[30px] text-black">
        Your Alme Points <span className="font-bold">[Season 1]</span>
      </h3>
      <div className="my-4 flex justify-between items-center">
        <p className="text-[52px] font-bold text-black">
          {points !== null ? points : "0"}
        </p>
        <button
          onClick={handleReloadPoints}
          className="text-white bg-black hover:bg-pink-700 transition-colors cursor-pointer rounded-full p-2"
          title="Reload Points"
        >
          <RefreshCw size={24} /> /* Using React-Feather icon *
        </button>
      </div>
      <button
        onClick={() =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          })
        }
        className="text-black-300 hover:text-pink-500 transition-colors cursor-pointer"
      >
        Earn More Alme Points →
      </button>
    </div> */}
    </>
  );

};

export default Card3;
