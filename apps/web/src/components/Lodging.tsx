'use client';
import React, { useState } from 'react';
import type { Game } from '@/app/api/datagames';
import { gamesData } from '@/app/api/datagames';

interface GameSectionProps {
  title: string;
  games: Game[];
}

const GameSection: React.FC<GameSectionProps> = ({ title, games }) => {
  const [showAll, setShowAll] = useState(false);
  const gamesToShow = showAll ? games : games.slice(0, 6);

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-xl font-semibold text-black mb-4">{title}</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {gamesToShow.map((game, index) => (
          <div
            key={index}
            className="bg-[#ffffff] rounded-lg p-3 text-center transform hover:scale-105 transition duration-200 shadow-lg"
          >
            <img
              src={game.imageUrl}
              alt={game.title}
              className="w-full h-24 md:h-32 lg:h-40 object-cover rounded-md mb-2"
            />
            <p className="text-black text-sm font-medium">{game.title}</p>
            <p className="text-[#9a98a3] text-xs">{game.category}</p>{' '}
            <p className="text-[#d96d62] text-sm font-semibold">
              {game.price === 0 ? 'Free' : `Rp ${game.price}`}{' '}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-500 hover:underline"
        >
          {showAll ? 'Tampilkan sebagian' : 'Tampilkan semua'}
        </button>
      </div>
    </div>
  );
};

export default function Lodging() {
  return (
    <div className="p-4 md:p-8 lg:p-12 ">
      <GameSection title="Popular" games={gamesData.popular} />
    </div>
  );
}
