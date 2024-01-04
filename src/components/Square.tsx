import { PIECES } from "../media/pieces";
import { useBoardStore } from "../store/BoardStore";
import { defaultSquare } from "../constants/global";
import React from "react";
import { Piece, TURNS } from "../types/Piece";
import { toast } from "react-toastify";
import { getPieceName } from "../utils/global";

export default function Square({ piece }: Readonly<{ piece: Piece }>) {
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

  const hintLigths =
    piece.coords[0] === selectedSquare.coords[0] &&
    piece.coords[1] === selectedSquare.coords[1]
      ? "shadow-[inset_0px_1px_8px_4px_#4299e1]"
      : "";

  const defaultSize = "w-12 h-12";
  const defaultHover = "hover:shadow-[inset_0px_1px_8px_4px_#4299e1]";
  const defaultStyle = "cursor-pointer";
  const colorSquare = (row + col) % 2 === 0 ? "bg-white" : "bg-green-900";

  const currentPiece = piece ? PIECES[piece.name] : piece;

  const tryAttack = () => {
    //TODO: Agregar tiempo en el que la ficha fue derrotada.
    const { color } = piece;
    if (color === TURNS.WHITE) {
      setWhiteDefeatedPieces([piece, ...whiteDefeatedPieces]);
    } else if (color === TURNS.BLACK) {
      setBlackDefeatedPieces([piece, ...blackDefeatedPieces]);
    } else {
      return;
    }
    toast.success(
      [
        "+6 PUNTOS - La pieza",
        getPieceName(piece),
        "de las",
        color,
        "ha sido derrotada ⚔️",
      ].join(" ")
    );
  };

  const movePiece = () => {
    if (!selectedSquare?.name) return;
    if (selectedSquare?.color !== turn) {
      toast.error(["Es el turno de las", turn, "✖️"].join(" "));
      return;
    }
    if (row < 1 || row > 8 || col < 1 || col > 8) return;
    if (piece?.color === turn && piece?.color !== undefined) return;
    let newBoard = [...board];
    newBoard[selectedSquare.coords[0]][selectedSquare.coords[1]] =
      defaultSquare;
    tryAttack();
    newBoard[row][col] = selectedSquare;
    setBoard(newBoard);
    setSelectedSquare(defaultSquare);
    toast.success("+3 PUNTOS - Movimiento Valido de las " + turn + " ✔️");
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
      className={[
        defaultStyle,
        colorSquare,
        hintLigths,
        defaultSize,
        defaultHover,
      ].join(" ")}
      onClick={() => handleClick()}
    >
      {currentPiece}
    </div>
  );
}
