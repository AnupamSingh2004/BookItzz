import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

import React from "react";
import Link from "next/link";

import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
const Header = ({ session }: { session: Session }) => {
  return (
    <header className={"my-10 flex justify-between gap-5 "}>
      <Link
        href="/"
        className="flex flex-row justify-center items-center gap-3"
      >
        <Image src={"/icons/logo.svg"} alt={"logo"} width={40} height={40} />

        <h1 className={"text-2xl font-semibold text-white"}>BookItzz</h1>
      </Link>

      <ul className={"flex flex-row items-center gap-8"}>
        <li>
          <Link href="/my-profile">
            <Avatar className="mt-[-36px]">
              <AvatarFallback className={"bg-amber-100 font-bold "}>
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};
export default Header;
