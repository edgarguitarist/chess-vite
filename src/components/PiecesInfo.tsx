import React from "react";
import SelectedPiece from "./SelectedPiece";
import GameHistory from "./GameHistory";

export default function PiecesInfo() {
  return (
    <div className="grid grid-rows-2 gap-5 game-info p-5 ">
      <SelectedPiece />
      <GameHistory />
    </div>
  );
}
