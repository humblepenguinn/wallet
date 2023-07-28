"use client";

import SideBar from "../components/SideBar";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";

import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function ViewAddresses() {
  const router = useRouter();
  const { status } = useSession();

  React.useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  const [data, setData] = React.useState([]);

  const toast = useToast();

  React.useEffect(() => {
    const getTransactionHistory = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/get_addresses`);
        setData(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 2000,
        });
      }
    };

    if (status === "authenticated") {
      getTransactionHistory();
    }
  }, []);

  if (status === "authenticated" && data) {
    return (
      <SideBar>
        <div className="bg-gray-100 min-h-screen">
          <div className="flex justify-between p-4">
            <h2>Addresses</h2>
          </div>

          <div className="p-4">
            <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
              <ul>
                {data.map((transaction) => (
                  <li
                    key={0}
                    className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center col-span-2">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <BsPersonFill className="text-blue-800" />
                      </div>
                      <p className="pl-4">{transaction.receiver}</p>
                    </div>

                    <div className="col-span-2 sm:col-span-1 pl-4 text-gray-600 sm:text-left text-right">
                      Balance: {transaction.amount}
                    </div>

                    <div className="hidden md:flex col-span-2 sm:col-span-1 text-gray-600 overflow-hidden whitespace-nowrap overflow-ellipsis">
                      Last Transaction: {transaction.date}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SideBar>
    );
  }
}
