import { useState, useEffect } from "react";
import axios from "axios";

export default function TopCards({ data }) {
  if (!data) {
    return <div></div>
  }

  return (
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold '>
                        Address
                    </p>
                    <p className='text-gray-600'>
                        {data.address}
                    </p>
                </div>
            </div>

            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold '>
                        Balance
                    </p>
                    <p className='text-gray-600'>
                        {data.balance}
                    </p>
                </div>
            </div>

            <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold '>
                        Public Key
                    </p>
                    <p className='text-gray-600'>
                        {data.public_key}
                    </p>
                </div>
            </div>

        </div>
  );
}


