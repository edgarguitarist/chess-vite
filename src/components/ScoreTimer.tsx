import React from "react";
import { useGameStore } from "../store/GameStore";
import { PLAYERS } from "../types/Piece";

export default function ScoreTimer({ color }: Readonly<{ color: PLAYERS }>) {
  const { getScore  } = useGameStore() as any;
  const PlayerScore = getScore(color);
  return (
    <div className="flex justify-between text-xl font-semibold my-4 bg-slate-800 text-white px-5 rounded-xl py-0.5">
      <span>SCORE - {PlayerScore?.toString()}</span>
      <span>09:50</span>
    </div>
  );
}
