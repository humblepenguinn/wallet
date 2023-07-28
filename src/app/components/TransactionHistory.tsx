import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { GrTransaction } from "react-icons/gr";

export default function TransactionHistory({ address }) {
  const [data, setData] = React.useState([]);

  const toast = useToast();

  React.useEffect(() => {
    const getTransactionHistory = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/get_transaction_history/${address}`
        );
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

    getTransactionHistory();
  }, []);

  if (data) {
    return (
      <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
        <h1>Transaction History</h1>
        <ul>
          {data.map((transaction: any) => (
            <li
              key={0}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer relative"
            >
              <div className="bg-green-100 rounded-lg p-3">
                <GrTransaction className="text-green-800" />
              </div>
              <div className="pl-4">
                <p className="text-gray-800 font-bold">${transaction.amount}</p>
                <p className="text-gray-400 text-sm">{transaction.reciever}</p>
              </div>
              <p className="lg:flex md:hidden absolute right-4 top-0 mt-2 text-sm text-gray-400">
                {transaction.date}
              </p>{" "}
              {/* Apply absolute positioning and adjust top and right spacing */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
