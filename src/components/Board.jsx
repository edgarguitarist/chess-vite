import { useBoardStore } from "../store/BoardStore";
import Square from "./Square";

export default function Board() {
  const { board } = useBoardStore();

  return (
    <section className="grid place-content-center h-[80vh]">
      <div className="border-2 border-black w-fit">
        {board.map((row, rowIndex) => {
          return (
            <div className="grid grid-cols-8 gap-0 w-fit" key={rowIndex}>
              {row.map((piece, colIndex) => {
                return (
                  <Square
                    key={colIndex}
                    coords={[rowIndex, colIndex]}
                    piece={{ ...piece, coords: [rowIndex, colIndex] }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
