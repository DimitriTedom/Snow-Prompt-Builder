"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviderss] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviderss(response);
    };

    setProviders();
  }, []);
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
                src={session?.user?.image}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
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

                <Link href={"/generate-prompt"} className="black_btn">
                  Generate Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
