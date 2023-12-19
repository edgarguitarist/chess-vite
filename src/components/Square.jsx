import { PIECES } from "../media/pieces";
import { useBoardStore } from "../store/BoardStore";
import { defaultSquare } from "../constants/global";

export default function Square({ piece }) {
  const [row, col] = piece.coords;
  const {
    board,
    setBoard,
    selectedSquare,
    setSelectedSquare,
    turn,
    changeTurn,
  } = useBoardStore();
 
  const isPiece = !!piece.name

  let hintLigths = "";
  const defaultSize = "w-12 h-12";

  const currentPiece = piece ? PIECES[piece.name] : piece;
  const colorSquare = (row + col) % 2 === 0 ? "bg-white" : "bg-green-900";

  const movePiece = () => {
    if (row < 0 || row > 7 || col < 0 || col > 7) return;
    if (piece?.color === turn && piece?.color !== undefined) return;
    let newBoard = [...board];
    newBoard[selectedSquare.row][selectedSquare.col] = defaultSquare;
    newBoard[row][col] = selectedSquare.piece;
    setBoard(newBoard);
    setSelectedSquare(defaultSquare);
    changeTurn();
    return true;
  };

  const handleClick = () => {
    console.log({isPiece})
    console.log({isPiece:!isPiece, name:!!selectedSquare.name})
    if(!isPiece && selectedSquare.name) return;
    
    if (movePiece()) return;

    const currentSquare = {
      row,
      col,
      piece: {
        ...piece,
        isSelected: true,
      },
      color: isPiece ? piece.color : null,
    };

    setSelectedSquare(isPiece ? currentSquare : defaultSquare);
  };


  return (
    <div
      className={[colorSquare, hintLigths, defaultSize].join(" ")}
      onClick={() => handleClick()}
      onKeyDown={() => handleClick()}
    >
      {currentPiece}
    </div>
  );
}
