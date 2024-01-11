import React from "react";
import { Piece, PLAYERS } from "../types/Piece";
import { PIECES } from "../media/pieces";
import { Tooltip } from "react-tooltip";
import { getPieceName, getTimeString } from "../utils/global";

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
          storedDefeatedPieces.map((piece, index) => {
            const keyName = `${piece.name}-${index}`;
            return (
              <>
                <div className="scale-[1.15]" key={keyName} id={keyName}>
                  {PIECES[piece.name]}
                </div>
                <Tooltip anchorSelect={"#" + keyName} place="top">
                  <div className="w-full flex items-center gap-4">
                    Nombre: {getPieceName(piece)}
                  </div>
                  <div className="w-full flex items-center gap-4">
                    Color: {piece.color}
                  </div>
                  <div className="">
                    Momento de Captura: {getTimeString(piece.defeatedAtTime)}
                  </div>
                </Tooltip>
              </>
            );
          })}
      </div>
    </div>
  );
}
