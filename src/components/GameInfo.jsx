import { useBoardStore } from "../store/BoardStore";
import { PIECES } from "../media/pieces";
import { TURNS } from "../types/Piece";
import GameHistory from "./GameHistory";

export default function GameInfo() {
  const { turn } = useBoardStore();
  const PIECE = turn === TURNS.WHITE ? PIECES["wK"] : PIECES["bK"];

  return (
    <div className="grid grid-max-content p-5">
      <div className="border-2 rounded border-black mb-6">
        <span className="text-2xl font-semibold flex items-center place-content-center my-2">
          Es el turno de las {turn} {PIECE}
        </span>
      </div>
      <GameHistory />
    </div>
  );
}
