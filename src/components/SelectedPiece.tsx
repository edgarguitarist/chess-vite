import React from "react";
import { PIECES } from "../media/pieces";
import { realCoords, getPieceName } from "../utils/global";
import { useGameStore } from "../store/GameStore";
import { Piece } from "../types/Piece";

export default function SelectedPiece() {
  const { selectedSquare, hoverSquare } = useGameStore() as { selectedSquare: Piece, hoverSquare: Piece };

  const hoveredSquare = !!hoverSquare?.name;
  const pieceShown = hoveredSquare ? hoverSquare : selectedSquare;

  return (
    <div className="text-xl font-semibold border-2 rounded border-black">
      <div>
        <span className="text-2xl p-2 block text-center font-semibold bg-slate-800 text-white">
          Pieza {hoveredSquare ? "en hover" : "Seleccionada"}
        </span>
      </div>
      <div className="py-2 px-5 grid grid-piece-info">
        <div>
          <div className="w-full flex items-center gap-4">
            Nombre:{" "}
            {!pieceShown.name ? "N/A" : getPieceName(pieceShown)}
          </div>
          <div className="w-full flex items-center gap-4">
            Color: {!pieceShown.color ? "N/A" : pieceShown.color}
          </div>
          <div className="w-full flex items-center gap-4">
            Coordenadas:{" "}
            {realCoords(pieceShown.coords)}
          </div>
        </div>
        <div className="grid place-items-center scale-[1.75]">
          {!pieceShown.name ? "N/A" : PIECES[pieceShown.name]}
        </div>
      </div>
    </div>
  );
}
