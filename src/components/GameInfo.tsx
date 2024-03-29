import { useGameStore } from "../store/GameStore";
import { PIECES } from "../media/pieces";
import { PLAYERS } from "../types/Piece";
import GameHistory from "./GameHistory";
import React from "react";
import GameSettings from "./GameSettings";

export default function GameInfo() {
  const { turn } = useGameStore();
  const PIECE = turn === PLAYERS.WHITE ? PIECES["wK"] : PIECES["bK"];

  return (
    <div className="grid p-5 gap-y-5">
      <div className="border-2 rounded border-black">
        <span className="text-2xl font-semibold flex items-center place-content-center my-2">
          Es el turno de las {turn} {PIECE}
        </span>
      </div>
      <GameHistory />
      <GameSettings />
    </div>
  );
}
