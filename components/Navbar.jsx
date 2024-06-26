"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdMenuOpen } from "react-icons/md";

import NavLogo from "../public/assets/favicon.png";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);


  return (
    <>
      <header className="border-b bg-white border-gray-300 py-2 z-10 sticky top-0">
        <div className="flex justify-between items-center xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap">
          <Link href="/" className="flex justify-between">
            <Image
              src={NavLogo}
              alt="logo"
              width={85}
              height={85}
              className="cursor-pointer"
            />
            <h1 className="text-3xl mt-5 font-extrabold text-teal-500 hidden sm:block">
              MemoFlow
            </h1>
          </Link>
          <MdMenuOpen
            className="lg:hidden block h-10 w-10 cursor-pointer text-teal-600 hover:text-teal-400"
            onClick={() => setOpen(!open)}
          />
          <nav
            className={`${
              open ? "block" : "hidden"
            } lg:flex lg:items-center lg:w-auto w-full`}
          >
            <ul className="text-lg text-gray-600 lg:flex lg:justify-between">
              {session && (
                <>
                  <li className="lg:px-5 py-2 hover:text-teal-500 font-semibold">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="mx-2 py-2 px-4 lg:px-6 lg:py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-800 font-semibold">
                    <button onClick={() => {
                      signOut()
                    }}>Logout</button>
                  </li>
                </>
              )}
              {!session && (
                <>
                  <li className="lg:px-5 py-2 hover:text-teal-500 font-semibold">
                    <Link href="/register">Register</Link>
                  </li>
                  <li className="py-2 px-4 lg:px-6 lg:py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-800 font-semibold">
                    <Link href="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
