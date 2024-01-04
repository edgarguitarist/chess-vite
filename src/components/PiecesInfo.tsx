import React from "react";
import SelectedPiece from "./SelectedPiece";
import DefeatedPieces from "./DefeatedPieces";
import { useBoardStore } from "../store/BoardStore";
import { TURNS } from "../types/Piece";

export default function PiecesInfo() {
  const { blackDefeatedPieces, whiteDefeatedPieces } = useBoardStore() as any;
  return (
    <div className="grid grid-rows-2 gap-5 grid-max-content p-5 ">
      <SelectedPiece />
      <div className="grid grid-rows-2 gap-5">
        <DefeatedPieces
          color={TURNS.BLACK}
          storedDefeatedPieces={blackDefeatedPieces}
        ></DefeatedPieces>
        <DefeatedPieces
          color={TURNS.WHITE}
          storedDefeatedPieces={whiteDefeatedPieces}
        ></DefeatedPieces>
      </div>
    </div>
  );
}
