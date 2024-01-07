import React from "react";
import { Piece, PLAYERS } from "../types/Piece";
import { PIECES } from "../media/pieces";

export default function DefeatedPieces({
  storedDefeatedPieces,
  color,
}: Readonly<{
  storedDefeatedPieces: Piece[];
  color: PLAYERS;
}>) {
  return (
    <div className="border-2 rounded border-black ">
      <div>
        <span className="text-2xl p-2 block text-center font-semibold bg-slate-800 text-white">
          Piezas {color} derrotadas
        </span>
      </div>
      <div className="grid grid-cols-8 py-4 px-3 place-items-center">
        {storedDefeatedPieces.map((piece, index) => (
          <div key={index}>{PIECES[piece.name]}</div>
        ))}
      </div>
    </div>
  );
}
