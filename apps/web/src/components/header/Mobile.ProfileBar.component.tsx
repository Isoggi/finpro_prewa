"use client";
import { actionLogout } from "@/actions/auth.action";
import { UserRoles } from "@/interfaces/user.interface";
import { SessionContextValue } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type Props = { session: SessionContextValue | null };

export default function MobileProfileBarComponent({ session }: Props) {
  const router = useRouter();

  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const logout = async () => {
    try {
      await actionLogout().then(() => {
        Toast.fire({
          icon: "success",
          title: "Logout Berhasil",
        });
        router.push("/");
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error, Logout Gagal",
      });
    }
  };
  return (
    <>
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold">
          {session ? session.data?.user.name : ""}
        </h3>
        <p className="text-sm text-gray-600">
          {session ? UserRoles[Number(session.data?.user.user_role)] : ""}
        </p>
      </div>
      <div className="mb-4 flex justify-between gap-2">
        <Link href="/profile" className="w-1/2">
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Profile
          </button>
        </Link>
        <Link href="/sign-in" className="w-1/2">
          <button
            type="button"
            className="w-full border border-red-600 text-red-600 py-2 rounded-md"
            onClick={() => logout()}
          >
            Log Out
          </button>
        </Link>
      </div>
    </>
  );
}
