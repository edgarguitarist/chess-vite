import React from "react";
import SelectedPiece from "./SelectedPiece";
import DefeatedPieces from "./DefeatedPieces";
import { useGameStore } from "../store/GameStore";
import { TURNS } from "../types/Piece";

export default function PiecesInfo() {
  const { [TURNS.BLACK]: black, [TURNS.WHITE]: white } = useGameStore() as any;
  return (
    <div className="grid grid-rows-2 gap-5 grid-max-content p-5 ">
      <SelectedPiece />
      <div className="grid grid-rows-2 gap-5">
        <DefeatedPieces
          color={TURNS.BLACK}
          storedDefeatedPieces={black.defeatedPieces}
        ></DefeatedPieces>
        <DefeatedPieces
          color={TURNS.WHITE}
          storedDefeatedPieces={white.defeatedPieces}
        ></DefeatedPieces>
      </div>
    </div>
  );
}
