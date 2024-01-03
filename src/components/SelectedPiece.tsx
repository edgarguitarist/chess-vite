import React from "react";
import { PIECES } from "../media/pieces";
import { realCoords, getPieceName } from "../utils/global";
import { useBoardStore } from "../store/BoardStore";
import { Piece } from "../types/Piece";

export default function SelectedPiece() {
const { selectedSquare } = useBoardStore() as { selectedSquare: Piece };

  return (
    <div className="text-2xl font-semibold p-5 border-2 rounded border-black">
      <div className="w-full flex items-end gap-4 h-[45px]">
        Pieza seleccionada:{" "}
        {!selectedSquare.name ? "N/A" : PIECES[selectedSquare.name]}
      </div>
      <div className="w-full flex items-center gap-4">
        Nombre: {!selectedSquare.name ? "N/A" : getPieceName(selectedSquare)}
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
  );
}
