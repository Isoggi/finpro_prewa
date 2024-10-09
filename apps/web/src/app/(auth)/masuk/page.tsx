'use client';

import React, { useState } from 'react';

export default function Daftar() {
  const [phone, setPhone] = useState<string>('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Phone number submitted: ${phone}`);
  };

  return (
    <div className="flex items-center px-4 justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Masukkan Email Kamu
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Silahkan masukan Email"
              value={phone}
              onChange={handlePhoneChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Silahkan masukan Password"
              value={phone}
              onChange={handlePhoneChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <p className="text-sm  mb-4">
            <a href="/" className=" hover:underline">
              Lupa password?
            </a>
          </p>

          <button
            type="submit"
            className="bg-[#128ede] text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-gray-800"
          >
            Lanjut
          </button>
          <p className="text-sm text-center pt-5 mb-4">
            Belum punya akun?{' '}
            <a href="/daftar" className="text-blue-600 hover:underline">
              Daftar, yuk!
            </a>
          </p>
          <p className="text-sm text-center mb-4">
            <a href="/" className=" hover:underline">
              Kembali ke Home
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
