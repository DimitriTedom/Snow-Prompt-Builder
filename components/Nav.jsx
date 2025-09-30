"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session, status } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // Removed providers state and useEffect since we're using direct Google sign-in

  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href={"/"} className="flex gap-2 flex-center">
          <Image
            src={"/assets/images/logo.svg"}
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="logo_text">Snow Prompt Builder</p>
        </Link>
        <div className="animate-pulse bg-gray-300 rounded-full w-10 h-10"></div>
      </nav>
    );
  }

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Snow Prompt Builder</p>
      </Link>

      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/generate-prompt"} className="black_btn">
              Generate Prompt
            </Link>
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session?.user?.image || "/assets/images/logo.svg"}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-2">
            {/* Direct Google sign-in without fetching providers */}
            <button
              type="button"
              onClick={() => {
                console.log("Direct Google sign in"); // Debug log
                signIn("google");
              }}
              className="black_btn"
            >
              Sign In with Google
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image || "/assets/images/logo.svg"}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full cursor-pointer"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <Link 
                  href={"/generate-prompt"} 
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Generate Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-3 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            {/* Direct Google sign-in for mobile */}
            <button
              type="button"
              onClick={() => {
                console.log("Mobile: Direct Google sign in"); // Debug log
                signIn("google");
              }}
              className="black_btn"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;