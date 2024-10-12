"use client";
import Link from "next/link";
import React from "react";

type Props = {};

export default function MobileSignBarComponent({}: Props) {
  return (
    <>
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold">Masuk ke Akunmu</h3>
        <p className="text-sm text-gray-600">
          Untuk menggunakan semua fitur di Loket
        </p>
      </div>
      <div className="mb-4 flex justify-between gap-2">
        <Link href="/sign-up" className="w-1/2">
          <button className="w-full bg-blue-600 text-white py-2 rounded-md">
            Daftar
          </button>
        </Link>
        <Link href="/sign-in" className="w-1/2">
          <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-md">
            Masuk
          </button>
        </Link>
      </div>
    </>
  );
}
