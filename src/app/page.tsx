// import Image from 'next/image'
// import Chart from './components/Chart'

// export default function Home() {
//   return (
//     <Chart></Chart>
//   )
// }

"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";

import Header from "./components/Header";
import TopCards from "./components/TopCards";
import Chart from "./components/Chart";
import TransactionHistory from "./components/TransactionHistory";
import SideBar from "./components/SideBar";
import DrawerContext from "./context/DrawerContext";
import Transaction from "./components/Transaction";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function Home() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const btnRef = React.useRef();

  const { status, data } = useSession();

  React.useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  const [metaData, setMetaData] = React.useState(null);

  const toast = useToast();

  React.useEffect(() => {
    const getMetaData = async () => {
      if (data?.user?.name && status === "authenticated") {
        try {
        const response = await axios.get(
          `http://127.0.0.1:8000/get_metadata/${data.user?.name}`
        );
        setMetaData(response.data);
        } catch (error) {
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 2000,
          });
        }
      }
    };

    getMetaData();
  }, [data]);

  if (status === "authenticated" && metaData) {
    return (
      <DrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
        <SideBar>
          <Head>
            <title>Home</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <main className="bg-grey-100 min-h-screen">
            {/* <Header /> */}
            <TopCards data={metaData} />
            <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
              <Chart />
              <TransactionHistory address={metaData.address} />
            </div>
          </main>

          <Transaction
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            useraddress={metaData.address}
          />
        </SideBar>
      </DrawerContext.Provider>
    );
  }
}
