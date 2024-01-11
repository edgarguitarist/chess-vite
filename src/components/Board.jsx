import { useGameStore } from "../store/GameStore";
import Square from "./Square";
import ScoreTimer from "./ScoreTimer";
import { PLAYERS } from "../types/Piece";

export default function Board() {
  const { board } = useGameStore();
  return (
    <section className="flex flex-col justify-between my-2 items-center">
      <ScoreTimer color={PLAYERS.BLACK} />
      <div className="border-2 border-black w-fit grid rows-board gap-0">
        {board.map((row, rowIndex) => {
          if (rowIndex === 0) {
            return (
              <div className="grid cols-board gap-0 w-full" key={rowIndex}>
                {row.map((piece, colIndex) => {
                  if (colIndex === 0) {
                    return <div key={piece}></div>;
                  }
                  return (
                    <div
                      className="bg-gray-300 text-center font-semibold"
                      key={colIndex}
                    >
                      {piece}
                    </div>
                  );
                })}
              </div>
            );
          }
          return (
            <div className="grid cols-board gap-0" key={rowIndex}>
              {row.map((piece, colIndex) => {
                if (colIndex === 0) {
                  return (
                    <div
                      className="bg-gray-300 text-center w-full h-full grid  place-items-center font-semibold"
                      key={colIndex}
                    >
                      {piece}
                    </div>
                  );
                }
                return (
                  <Square
                    key={colIndex}
                    piece={{ ...piece, coords: [rowIndex, colIndex] }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <ScoreTimer color={PLAYERS.WHITE} />
    </section>
  );
}
