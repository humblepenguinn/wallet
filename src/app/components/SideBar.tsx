import {useContext} from "react";
import Link from "next/link";
import { RxPerson } from 'react-icons/rx';
import { BiLogOut } from 'react-icons/bi';
import { BsSendFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';

import DrawerContext from "../context/DrawerContext";

export default function SideBar({children}) {

    const {setDrawerOpen} = useContext(DrawerContext);

    return (
        <div className='flex'>
            <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
                <div className='flex flex-col items-center'>
                    <Link href='/'>
                        <div className="bg-blue-800 text-white p-3 rounded-lg inline-block">
                            <AiFillHome size={20}/>
                        </div>
                    </Link>

                    <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                    <button onClick={() => {
                        setDrawerOpen(true);
                    }}>
                        <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                            <BsSendFill size={20}/>
                        </div>
                    </button>

                    <Link href='/view-addresses'>
                        <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                            <RxPerson size={20}/>
                        </div>
                    </Link>

                    <Link href='/logout'>
                        <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
                            <BiLogOut size={20}/>
                        </div>
                    </Link>

                </div>
            </div>

            <main className='ml-20 w-full'>{children}</main>
        </div>
    );
}