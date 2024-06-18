// pages/index.tsx

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Card1 from "../components/Card1";
import Card2 from "../components/Card2";
import Card3 from "../components/Card3";
import TaskList from "../components/TaskList";
import { Session } from "next-auth";
import fav from "./favicon.ico";
import Image, { StaticImageData } from "next/image";
import ScreenSizeWarning from "../components/ScreenSizeWarning";

import { GlobalStyle, SwitzerV, OpenSansFont, DharmaGE } from "../assets/css/globalStyle.js";
import { GlobalColorsStyle } from "../assets/css/colorsLib.js";

import { PageGlobal, UserPointsSection, UserPointsWrap, ActivitySection, ActivityWrap } from "../styles/styled.js";
import Link from "next/link";

interface CustomSession extends Session {
  accessToken?: string; // Define the accessToken property
}

const Home = () => {
  const { isConnected, address } = useAccount();
  const [targetServer, setTargetServer] = useState(false);

  const { data: session } = useSession();
  const customSession = session as CustomSession;
  const TARGET_SERVER_ID = "635865020172861441";

  if (session && !targetServer) {
    fetch("https://discord.com/api/v9/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${customSession?.accessToken}`,
      },
    }).then(async (res: any) => {
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (Array.isArray(data)) {
        const isInTargetServer = data?.some(
          (guild: { id: string }) => guild.id === TARGET_SERVER_ID
        );
        if (isInTargetServer) {
          setTargetServer(true);
        }
        return;
      } else if (data && data.guilds && Array.isArray(data.guilds)) {
        const isInTargetServer = data?.guilds.some(
          (guild: { id: string }) => guild.id === TARGET_SERVER_ID
        );
        if (isInTargetServer) {
          setTargetServer(true);
        }
        return;
      } else {
        // Handle other response structures or errors
        console.error("Unexpected response structure:", data);
        return;
      }
    });
  }

  const signin = async () => {
    await signIn("discord");
  };

  return (
    <div className={styles.container}>
      <ScreenSizeWarning />
      <Head>
        <title>Alme Airdrop - Farm $ALME</title>
        <meta content="Airdrop site" name="description" />
        <link
          href="https://www.almemater.com/alme-maters-favicon.ico"
          rel="shortcut icon"
        />

        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css' integrity='sha512-jnSuA4Ss2PkkikSOLtYs8BlYIeeIK1h99ty4YfvRPAlzr377vr3CXDb7sb7eEEBYjDtcYj+AjBH3FLv5uSJuXg==' crossOrigin='anonymous' />


      </Head>
      <main className={styles.main +" "+ `${SwitzerV.variable} ${OpenSansFont.variable} ${DharmaGE.variable}`}>
        <GlobalStyle />
        <GlobalColorsStyle />
        <PageGlobal />

        {/* <Card1 /> */}
        <UserPointsSection className='hero-section'>
          <Image
            className="absolute -z-30 vw-100 h-100"
            src={require("../assets/images/vivid-blurred-colorful-bg.png")}
            alt="bg"
          ></Image>
          <Image
            className="absolute -z-30 vw-100 h-100"
            src={require("../assets/images/noise-and-texture-bg.png")}
            alt="bg"
            style={{ mixBlendMode: "multiply" }}
          ></Image>
          <div className="container">
            <UserPointsWrap>
              <div className="row gy-4">
                <div className="col-xl-9 col-lg-8">

                  <Card3 />
                </div>
                <div className="col-xl-3 col-lg-4">
                  <Card2 />

                </div>
              </div>
            </UserPointsWrap>
          </div>
        </UserPointsSection>

        <ActivitySection className="theme-bg-black-primary">
          <div className="container">
            <ActivityWrap>
              <h5 >Activities</h5>
              <p className="mb-4">Get rewarded for your activities on Alme Mater, let’s get started!</p>
              <TaskList />
            </ActivityWrap>
          </div>
        </ActivitySection>
      </main>
      <footer className="theme-bg-black-primary  ">
        <div className="container">
          <div className='row gy-4 justify-content-center flex-md-row flex-column-reverse'>
            <div className=' col-md-6'>
              <p className='mb-0 text-md-start text-center'>
                <strong>© 2024</strong> Alme Mater.
                All Rights Reserved
              </p>
            </div>
            <div className=' col-md-6'>
              <ul>
                <li>
                  <Link
                    href='https://twitter.com/almemater'
                    target='_blank'>
                    <del>Twitter</del> X
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://t.me/+edzcRxDe_Vc1ZGQ1'
                    target='_blank'>
                    Telegram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
