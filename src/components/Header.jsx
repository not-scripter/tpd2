import React, { useState } from "react";
import { Logo, Button } from "../components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { CrossSvg, MenuSvg, defaultAvatar } from "../assets";
import { PostServices } from "../appwrite";

export default function Header() {
  const { authStatus, profileData } = useSelector((state) => state.auth);
  const navItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/Signup",
      active: !authStatus,
    },
    {
      name: "Account",
      slug: "/account/info",
      active: authStatus,
    },
  ];

  const [mobNav, setmobNav] = useState(false);

  return (
    <header className="flex flex-col z-30">
      <section className="relative w-full flex items-center justify-between bg-primary text-secondary px-4 py-2">
        { authStatus && 
          <NavLink to={`/${profileData?.username}`} className={({isActive}) => [
            isActive && "shadow-secondary shadow-md",
            "w-8 h-8 rounded-full object-cover"
          ].join(" ")
          }>
            <img
              className="w-8 h-8 bg-cover rounded-full shadow-md shadow-secondary/50"
              src={profileData.avatar ? PostServices.getAvatarPreview(profileData.avatar) : defaultAvatar}
            />
          </NavLink>
        }
        <Logo className="z-30" />
        <Button
          onClick={() => setmobNav((prev) => !prev)}
          bg="bg-primary/50"
          className="visible sm:hidden w-8 h-8 p-1 z-30"
          rounded="rounded-full"
        >
          {!mobNav ? <MenuSvg /> : <CrossSvg />}
        </Button>
        <nav
          className={`${mobNav ? "visible" : "hidden"} absolute z-20 top-0 pt-14 left-0 sm:visible bg-primary/20 text-secondary backdrop-blur flex flex-col gap-2 px-4 w-full h-dvh text-2xl font-semibold`}
        >
          {navItems.map((items) =>
            items.active ? (
              <NavLink
                onClick={() => setmobNav(false)}
                key={items.slug}
                to={items.slug}
                className={({ isActive }) =>
                  [
                    isActive
                      ? "bg-secondary text-primary"
                      : "bg-primary text-secondary",
                    "rounded-full px-6 py-1 font-semibold flex items-center justify-center shadow active:bg-opacity-80 hover:bg-secondary hover:text-primary hover:outline hover:outline-secondary/20 hover:outline-4",
                  ].join(" ")
                }
              >
                {items.name}
              </NavLink>
            ) : null,
          )}
        </nav>
      </section>
    </header>
  );
}
