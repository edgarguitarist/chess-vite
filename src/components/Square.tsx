import { PIECES } from "../media/pieces";
import { useBoardStore } from "../store/BoardStore";
import { defaultSquare } from "../constants/global";
import React from "react";
import { Piece, TURNS } from "../types/Piece";

export default function Square({ piece }: { piece: Piece }) {
  const [row, col] = piece.coords;
  const {
    board,
    setBoard,
    selectedSquare,
    setSelectedSquare,
    turn,
    changeTurn,
    whiteDefeatedPieces,
    setWhiteDefeatedPieces,
    blackDefeatedPieces,
    setBlackDefeatedPieces,
  }: any = useBoardStore();

  const isPiece = !!piece.name;

  let hintLigths = "";
  const defaultSize = "w-12 h-12";

  const currentPiece = piece ? PIECES[piece.name] : piece;
  const colorSquare = (row + col) % 2 === 0 ? "bg-white" : "bg-green-900";

  const tryAttack = (square) => {
    const { color } = square;
    if (color === TURNS.WHITE) {
      setBlackDefeatedPieces([square, ...blackDefeatedPieces]);
    }
    if (color === TURNS.BLACK) {
      setWhiteDefeatedPieces([square, ...whiteDefeatedPieces]);
    }
  };

  const movePiece = () => {
    if (!selectedSquare?.name) return;
    if (selectedSquare?.color !== turn) return;
    if (row < 1 || row > 8 || col < 1 || col > 8) return;
    if (piece?.color === turn && piece?.color !== undefined) return;
    let newBoard = [...board];
    newBoard[selectedSquare.coords[0]][selectedSquare.coords[1]] =
      defaultSquare;
    tryAttack(piece);

    newBoard[row][col] = selectedSquare;
    setBoard(newBoard);
    setSelectedSquare(defaultSquare);
    changeTurn();
    return true;
  };

  const handleClick = () => {
    if (!isPiece && !selectedSquare.isSelected) return;

    if (movePiece()) return;

    const currentSquare = {
      ...piece,
      isSelected: true,
    };

    setSelectedSquare(isPiece ? currentSquare : defaultSquare);
  };

  return (
    <div
      className={[colorSquare, hintLigths, defaultSize].join(" ")}
      onClick={() => handleClick()}
    >
      {currentPiece}
    </div>
  );
}
