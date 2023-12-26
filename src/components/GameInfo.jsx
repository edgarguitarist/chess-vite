import { useBoardStore } from "../store/BoardStore";
import { PIECES } from "../media/pieces";
import { TURNS } from "../types/Piece";

export default function GameInfo() {
  const { turn, blackDefeatedPieces, whiteDefeatedPieces } = useBoardStore();
  console.log({ turn });
  return (
    <div className="grid grid-rows-3">
      <div>Es el turno de los {turn}</div>
      <div>
        Fichas {TURNS.BLACK} derrotadas
        <div className="grid grid-cols-8">
          {blackDefeatedPieces.map((piece, index) => (
            <div key={index}>{PIECES[piece.name]}</div>
          ))}
        </div>
      </div>
      <div>
        Fichas {TURNS.WHITE} derrotadas
        <div className="grid grid-cols-8">
          {whiteDefeatedPieces.map((piece, index) => (
            <div key={index}>{PIECES[piece.name]}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
