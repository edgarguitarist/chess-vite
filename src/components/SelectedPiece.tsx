import React from "react";
import { PIECES } from "../media/pieces";
import { realCoords, getPieceName } from "../utils/global";
import { useBoardStore } from "../store/BoardStore";
import { Piece } from "../types/Piece";

export default function SelectedPiece() {
  const { selectedSquare } = useBoardStore() as { selectedSquare: Piece };

  return (
    <div className="text-xl font-semibold border-2 rounded border-black">
      <div>
        <span className="text-2xl p-2 block text-center font-semibold bg-slate-800 text-white">
          Pieza seleccionada
        </span>
      </div>
      <div className="py-2 px-5 grid grid-piece-info">
        <div>
          <div className="w-full flex items-center gap-4">
            Nombre:{" "}
            {!selectedSquare.name ? "N/A" : getPieceName(selectedSquare)}
          </div>
          <div className="w-full flex items-center gap-4">
            Color: {!selectedSquare.color ? "N/A" : selectedSquare.color}
          </div>
          <div className="w-full flex items-center gap-4">
            Coordenadas:{" "}
            {selectedSquare.coords[0] === 0
              ? "N/A"
              : realCoords(selectedSquare.coords)}
          </div>
        </div>
        <div className="grid place-items-center scale-110">
          {!selectedSquare.name ? "N/A" : PIECES[selectedSquare.name]}
        </div>
      </div>
    </div>
  );
}
