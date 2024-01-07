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
      <div className="grid grid-cols-8 py-4 px-3 place-items-center gap-2">
        {!storedDefeatedPieces.length && (
          <div className="col-span-8 text-center font-semibold text-lg mt-8">
            No hay piezas {color} derrotadas.
          </div>
        )}
        {storedDefeatedPieces.length > 0 &&
          storedDefeatedPieces.map((piece, index) => (
            <div className="scale-[1.15]" key={index}>{PIECES[piece.name]}</div>
          ))}
      </div>
    </div>
  );
}
