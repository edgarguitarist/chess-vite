import { defaultPieces } from "../media/pieces";
export default function Board() {
  //const board = Array(8).fill(Array(8).fill(null));
  const board = [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
  ];
  const handleClick = (coords) => {
    console.log(coords);
  };

  const Square = ({ children, coords }) => {
    const color =
      (coords[0] + coords[1]) % 2 === 0 ? "bg-white" : "bg-green-900";
    console.log(children);
    return (
      <>
        <div
          className={color + " square w-12 h-12  flex"}
          onClick={() => handleClick(coords)}
        >
          {children ? defaultPieces[children] : null}
        </div>
      </>
    );
  };

  return (
    <div className="border-2 border-black w-fit">
      {board.map((row, rowIndex) => {
        return (
          <div className="grid grid-cols-8 gap-0 w-fit" key={rowIndex}>
            {row.map((piece, colIndex) => {
              return (
                <Square key={colIndex} coords={[rowIndex, colIndex]}>
                  {piece}
                </Square>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
