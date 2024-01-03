import React from "react";
import { Piece, TURNS } from "../types/Piece";
import { PIECES } from "../media/pieces";

export default function DefeatedPieces({
  storedDefeatedPieces,
  color,
}: Readonly<{
  storedDefeatedPieces: Piece[];
  color: TURNS;
}>) {

  return (
    <div className="p-5 border-2 rounded border-black ">
      <span className="text-2xl block text-center font-semibold">Piezas {color} derrotadas</span>
      <div className="grid grid-cols-8 pt-5">
        {storedDefeatedPieces.map((piece, index) => (
          <div key={index}>{PIECES[piece.name]}</div>
        ))}
      </div>
    </div>
  );
}
