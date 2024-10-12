import Link from "next/link";
import React from "react";

type Props = {};

export default function SignBarComponent({}: Props) {
  return (
    <>
      <Link href="/sign-up">
        <button className="hidden lg:flex border border-white text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-white hover:text-black ">
          Sign Up
        </button>
      </Link>
      <Link href="/sign-in">
        <button className="hidden lg:flex bg-[#0070C9] text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-[#005A9E]">
          Sign In
        </button>
      </Link>
    </>
  );
}
