import { useBoardStore } from "../store/BoardStore";
import Square from "./Square";
import ScoreTimer from "./ScoreTimer";

export default function Board() {
  const { board } = useBoardStore();
  return (
    <section className="grid place-content-center">
      <ScoreTimer />
      <div className="border-2 border-black w-fit grid grid-rows-9 gap-0">
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
                    >{piece}</div>
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
                    >{piece}</div>
                  )
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
      <ScoreTimer />
    </section>
  );
}
