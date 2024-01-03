import { useBoardStore } from "../store/BoardStore";
import { PIECES } from "../media/pieces";
import { TURNS } from "../types/Piece";
import DefeatedPieces from "./DefeatedPieces";

export default function GameInfo() {
  const { turn, blackDefeatedPieces, whiteDefeatedPieces } = useBoardStore();
  const PIECE = turn === TURNS.WHITE ? PIECES["wK"] : PIECES["bK"];

  return (
    <div className="grid game-info p-5">
      <div className="border-2 rounded border-black mb-6">
        <span className="text-2xl font-semibold flex items-center place-content-center my-2">
          Es el turno de las {turn} {PIECE}
        </span>
      </div>
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
