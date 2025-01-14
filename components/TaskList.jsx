import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useSession, signIn, signOut } from "next-auth/react";
import { check_nft_ownership } from "../utils/web3-utils";
import { check_nft_ownership1 } from "../utils/web3-utils";
import MintModal from "./MintModal";
import { ActivityCard, ColorPillText, DiscountPill } from "../styles/styled";
import Image from "next/image";
import Link from "next/link";

const activities = [
  {
    key: 1,
    quest: "Discord",
    questIcon: "discord-icon.png",
    points: "100",
    info: "Join and get verified on Discord.",
    btnName: "Join Discord ",
    btnLink: "https://discord.gg/amewkxzs7J",
  },
  {
    key: 2,
    quest: "GM Per Day",
    questIcon: "gm-per-day-icon.png",
    points: "10",
    info: "Type /gm and paste your wallet address",
    btnName: "Join Activity ",
    btnLink: "https://discord.com/channels/1083617900759371776/1088848310854496337",
  },
  {
    key: 3,
    quest: "Refer & Earn",
    questIcon: "refer-and-earn-icon.png",
    points: "1500",
    info: "Both you and the person you refer receive 1500 bonus Alme Points.",
    btnName: "Refer Now",
    btnLink: "",
  },
  {
    key: 4,
    quest: "Subscribe Newsletter",
    questIcon: "subscribe-newsletter-icon.png",
    points: "250",
    info: "Keep yourself updated with Alme Mater Newsletter",
    btnName: "Subscribe",
    btnLink: "",
  },
  {
    key: 5,
    quest: "Genesis NFT",
    questIcon: "nft-coin-icon.png",
    points: "300",
    info: "Unlock your journey into the future of learning by minting your Genesis NFT today!",
    btnName: "Mint ID",
    btnLink: "",
  },
  {
    key: 6,
    quest: "Hodl NFT",
    questIcon: "nft-coin-with-hand-icon.png",
    points: "20",
    info: "Earn exclusive rewards and accumulate points just by holding your NFT — your gateway to continuous benefits and opportunities!",
    btnName: "Hodl NFT",
    btnLink: "",
  },




];
/* const rows = [
  {
    key: 1,
    Quest: "Join Our Discord",
    Points: "100 Alme Points",
    de1: "Join and get verified on Discord.",
    link: "https://discord.gg/amewkxzs7J",
  },
  {
    key: 2,
    Quest: "Daily Discord Check-in",
    Points: "10 Alme Points",
    de1: "Type /gm and paste your wallet address",
    de2: "per day",
    actionLink: "https://discord.com/channels/1083617900759371776/1088848310854496337",
  },
  {
    key: 3,
    Quest: "NFT 1",
    Points: "100 Alme Points",
    de1:"Free mint on Polygon",
  },

  {
    key: 4,
    Quest: " NFT 2",
    Points: "100 Alme Points",
    de1:"Free mint on Polygon",
  },

  {
    key: 5,
    Quest: "NFT 3",
    Points: "100 Alme Points",
    de1:"Free mint on Polygon",
  },
  {
    key: 6,
    Quest: "HODL the Alme Points Genesis NFT",
    Points: "10 Alme Points",

    de1:"Free mint on Base",
    de2:"per day",
  },

  {
    key: 7,
    Quest: "Subscribe to our Alme Newsletter",
    Points: "250 Alme Points",
    de1: "Takes under 1 minute",
  },


  
];
 */
function renderDescription(description, link) {
  return (
    <>
      {description} {link && <span><strong><a href={link} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">Join here</a></strong></span>}
    </>
  );
}

const columns = [
  {
    key: "Quest",
    label: "Quests",
  },
  {
    key: "Points",
    label: "Alme Points",
  },
  {
    key: "btnStates",
    label: "btnStates",
  },
];

const TARGET_SERVER_ID = "1083617900759371776";

function isOneDayOld(oldISOString) {
  const oldDate = new Date(oldISOString);

  // Adjust for Indian Standard Time (IST)
  oldDate.setMinutes(oldDate.getMinutes() + 30);

  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 30);

  const difference = currentDate - oldDate;

  const oneDayInMillis = 24 * 60 * 60 * 1000;

  return difference >= oneDayInMillis;
}

const getUserGuilds = async (accessToken) => {
  const response = await fetch("https://discord.com/api/v9/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (Array.isArray(data)) {
    const isInTargetServer = data?.some(
      (guild) => guild.id === TARGET_SERVER_ID
    );
    return isInTargetServer;
  } else if (data && data.guilds && Array.isArray(data.guilds)) {
    const isInTargetServer = data?.guilds.some(
      (guild) => guild.id === TARGET_SERVER_ID
    );
    return isInTargetServer;
  } else {
    // Handle other response structures or errors
    console.error("Unexpected response structure:", data);
    return false;
  }
};

const TaskList = () => {
  const [userData, setUserData] = useState(null);
  const { isConnected, address } = useAccount();
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [email, setEmail] = useState("");
  const { data: session } = useSession();
  const [ispOpen, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const [btnStates, setBtnStates] = useState({
    1: "Join Discord",
    2: "Join Activity",
    3: "Refer Now",
    4: "Subscribe",
    5: "Mint ID",
    6: "Hodl NFT",
  });
  const [showMintModal, setShowMintModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  

  useEffect(() => {
    const get_data = async () => {
      const res = await fetch(`/api/user/${address}`);
      // console.log("response:", res);
      const data = await res.json();
      // console.log("user-data:", data);
      if (data == null) return;

      setUserData(data);
      if (data.discord_joined_claim) {
        setBtnStates((oldVal) => ({ ...oldVal, 1: "Already Claimed" }));
      }
    };
    if (isConnected) {
      get_data();
    }
  }, [address, btnStates]);

  const validateEmail = (email) => email.includes("@");

  // This is a conceptual and NOT recommended approach
  const submitEmail = async () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Hypothetical fetch to get all users/emails (NOT recommended in practice)
    const usersResponse = await fetch("/api/user");
    const users = await usersResponse.json();

  
    

    // Check if email already exists in the list of users
    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      alert(
        "This email is already registered for Newsletter. \nPlease use different email"
      );
      return;
    }

    // Proceed with your existing logic to update the user with the new email
    const response = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        email: email,
        emailAdded: true,
        totalPts: userData.totalPts + 250,
      }),
    });

    if (response.ok) {
      setBtnStates((prev) => ({ ...prev, 5: "Points Claimed" }));
      setShowEmailPopup(false);
      alert("Thank you for subscribing!");
    } else {
      alert("Failed to subscribe, please try again.");
    }
  };

  const claimPoints = async (key, actionLink = "") => {
    if (!userData) return;

    switch (key) {
      case 1:

        if (!session) {
          signIn("discord");
          return; // Ensure to return after calling signIn to prevent further execution until the session is established
        }

        setBtnStates((oldVal) => ({ ...oldVal, 1: "checking..." }));

        // Add check for discord_id being null or empty
        if (!userData.discord_id) {
          console.log("Discord not connected");
          setBtnStates((oldVal) => ({ ...oldVal, 1: "Connect Discord first" }));
          return; // Stop execution if no Discord ID is linked
        }

        if (userData.discord_joined_claim) {
          setBtnStates((oldVal) => ({ ...oldVal, 1: "Already Claimed" }));
          return;
        } else if (await getUserGuilds(session.accessToken)) {
          console.log("In here 1");
          //post req to update data
          await fetch("/api/user/update", {
            method: "POST",
            body: JSON.stringify({
              address: address,
              discord_joined_claim: true,
              totalPts: userData.totalPts + 100,
            }),
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          });
          setBtnStates((oldVal) => ({ ...oldVal, 1: "Points Claimed" }));
          return;
        } else {
          console.log("In here 2");
          setBtnStates((oldVal) => ({
            ...oldVal,
            1: <a href="https://discord.gg/amewkxzs7J" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Join Server</a>,
          }));
          return;
        }
        break;



      case 2:
        if (actionLink) {
          window.open(actionLink, '_blank');
          return;
        }
        break;

      case 3:
        // if (userData.nft_minted_claim) {
        //   setBtnStates((oldVal) => ({ ...oldVal, 3: "Already Claimed" }));
        //   console.log("Already Minted");

        //   return;
        // } else if (await check_nft_ownership(address)) {
        //   await fetch("/api/user/update", {
        //     method: "POST",
        //     body: JSON.stringify({
        //       address: address,
        //       nft_minted_claim: true,
        //       totalPts: userData.totalPts + 100,
        //     }),
        //     headers: {
        //       Accept: "*/*",
        //       "Content-Type": "application/json",
        //     },
        //   });
        //   console.log("Already minted adding points");

        //   setBtnStates((oldVal) => ({ ...oldVal, 3: "Points Claimed" }));
        //   return;
        // } else {
        //   console.log("Minting NFT");
        //   setShowMintModal(true); // Open the mint modal
        //   return;
        // }
        // break;
        scrollToTop();
        console.log("Scrolling to the top for key 7");
        break;
  
      
      case 7:
        if (userData.nft_minted_claim) {
          setBtnStates((oldVal) => ({ ...oldVal, 3: "Already Claimed" }));
          console.log("Already Minted");

          return;
        } else if (await check_nft_ownership(address)) {
          await fetch("/api/user/update", {
            method: "POST",
            body: JSON.stringify({
              address: address,
              nft_minted_claim: true,
              totalPts: userData.totalPts + 100,
            }),
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          });
          console.log("Already minted adding points");

          setBtnStates((oldVal) => ({ ...oldVal, 3: "Points Claimed" }));
          return;
        } else {
          console.log("Minting NFT");
          setShowMintModal(true); // Open the mint modal
          return;
        }
        break;


      case 5:
        if (userData.nft_minted_claim) {
          setBtnStates((oldVal) => ({ ...oldVal, 5: "Already Claimed" }));
          console.log("Already Minted");

          return;
        } else if (await check_nft_ownership(address)) {
          await fetch("/api/user/update", {
            method: "POST",
            body: JSON.stringify({
              address: address,
              nft_minted_claim: true,
              totalPts: userData.totalPts + 100,
            }),
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          });
          console.log("Already minted adding points");

          setBtnStates((oldVal) => ({ ...oldVal, 5: "Points Claimed" }));
          return;
        } else {
          console.log("Minting NFT");
          setShowMintModal(true); // Open the mint modal
          return;
        }
        break;

      case 6:
        if (!(await check_nft_ownership(address))) {
          setBtnStates((oldVal) => ({ ...oldVal, 6: "Mint AM NFT First" }));
          return;
        } else if (userData.Latest_NFT_date == null) {
          const pointsToClaim = userData.totalDailyNFTcount + 1;
          await fetch("/api/user/update", {
            method: "POST",
            body: JSON.stringify({
              address: address,
              totalPts: userData.totalPts + 20,
              Latest_NFT_date: new Date(),
              totalDailyNFTcount: pointsToClaim,
            }),
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          });
          setBtnStates((oldVal) => ({ ...oldVal, 6: "Points Claimed" }));
          return;
        } else if (isOneDayOld(userData.Latest_NFT_date)) {
          await fetch("/api/user/update", {
            method: "POST",
            body: JSON.stringify({
              address: address,
              totalPts: userData.totalPts + 20,
              Latest_NFT_date: new Date(),
            }),
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          });

          setBtnStates((oldVal) => ({ ...oldVal, 6: "Points Claimed" }));
          return;
        } else {
          const claimedPoints = userData.totalDailyNFTcount * 20;
          setBtnStates((oldVal) => ({
            ...oldVal,
            6: `Claimed (${claimedPoints} points)`,
          }));
          return;
        }
      default:
        break;

      case 4:
        if (isConnected) {
          if (userData && userData.emailAdded) {
            // If emailAdded is true, it means the user has already subscribed and claimed the points
            setBtnStates((oldVal) => ({ ...oldVal, 4: "Already Claimed" }));
            alert("You have already subscribed and claimed your points.");
          } else {
            setShowEmailPopup(true);
          }
        }
        break;


    }
  };

 
  return (
    <>
      <div className="row gy-4">
        {activities.map((activity) => (
          <div className="col-xl-4 col-md-6" key={activity.key}>
            <ActivityCard>
              <div className="d-flex align-items-center gap-4 justify-content-between">
                <div className="item-img">
                  <Image
                    src={require(`../assets/images/${activity.questIcon}`).default}
                    alt={activity.quest}
                  />
                </div>

                <ColorPillText>Claim Points</ColorPillText>
              </div>
              <h6>
                {activity.quest}{" "}
                <span className="info" data-info={activity.info}>
                  <Image
                    src={require("../assets/images/info-icon.svg").default}
                    alt="info"
                  />
                </span>
              </h6>
              <div className="align-items-center d-flex flex-column flex-md-row gap-4 justify-content-lg-between">
                <DiscountPill points="true">
                  <Image
                    src={require("../assets/images/point-icon.svg").default}
                    alt="icon"
                  ></Image>
                  {activity.points}
                </DiscountPill>
                {activity.btnLink !== "" ? (
                  <Link
                    href={activity.btnLink}
                    className="custom-btn"
                    target="_blank"
                    onClick={() => claimPoints(activity.key, activity.btnLink)}
                  >
                    {btnStates[activity.key]}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="custom-btn"
                    onClick={() => claimPoints(activity.key)}
                  >
                    {btnStates[activity.key]}
                  </button>
                )}
              </div>
            </ActivityCard>
          </div>
        ))}
      </div>




      {/*       <div className="relative w-[70%] overflow-x-auto shadow-md sm:rounded-lg bg-white opacity-70 pb-6">

        <table className="w-full text-sm text-left text-black dark:text-black ">
          <caption className="px-8 pt-10 text-[42px] text-left text-black text-black">
            Quests for Season 1
            <hr className="mt-10 mb-5 border-black" />
          </caption>
          <thead className="text-[22px] bg-none text-black">
            <tr>
              {columns.map((column) => (
                <th scope="col" className="px-8 py-3" key={column.key}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="bg-none text-black text-[18px]" key={row.key}>
                <td className="px-8 py-4">
                  {row.Quest}
                  <div className="text-black text-[12px]">
                    {renderDescription(row.de1, row.link)}
                  </div>
                </td>
                <td className="px-8 py-4">
                  {row.Points}
                  <div className="px-1 text-black text-[12px]">{row.de2}</div>
                </td>
                <td className="px-8 py-4">
                  {isConnected ? (
                    <button
                      className="px-4 py-2 bg-black text-white font-bold rounded-full hover:bg-pink-600 transition duration-300"
                      onClick={() => claimPoints(row.key, row.actionLink)}
                    >
                      {btnStates[row.key]}
                    </button>
                  ) : (
                    "*****"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}


      {showMintModal && (
        <MintModal
          closeModal={() => setShowMintModal((prev) => !prev)}
          setBtnStates={setBtnStates}
        />
      )}

      {/* <MintModal setBtnStates={setBtnStates} /> */}
      {showEmailPopup && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" // Adjusted for centering
        >
          <div className="relative mx-auto p-5 border shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Subscribe to Newsletter
              </h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="submit-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" // Changed background color
                  onClick={submitEmail}
                >
                  Subscribe
                </button>
                <button
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setShowEmailPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;