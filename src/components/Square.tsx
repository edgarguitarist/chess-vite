import { PIECES } from "../media/pieces";
import { useGameStore } from "../store/GameStore";
import { createMoveSet, defaultSquare } from "../constants/global";
import React from "react";
import { Piece, PLAYERS } from "../types/Piece";
import { toast } from "react-toastify";
import { getPieceName, realCoords } from "../utils/global";
import { STATES_GAME } from "../types/global";

export default function Square({ piece }: Readonly<{ piece: Piece }>) {
  const [row, col] = piece.coords;
  const {
    board,
    setBoard,
    selectedSquare,
    setSelectedSquare,
    setHoverSquare,
    turn,
    changeTurn,
    setDefeatedPieces,
    setScore,
    getTime,
    setHistory,
    stateGame,
  }: any = useGameStore();

  const isPiece = !!piece.name;

  const hintLights =
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
    piece.defeatedAtTime = color ? getTime(color) : 0;
    if (color === PLAYERS.WHITE) {
      setDefeatedPieces(PLAYERS.WHITE, piece);
    } else if (color === PLAYERS.BLACK) {
      setDefeatedPieces(PLAYERS.BLACK, piece);
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
    setScore(selectedSquare?.color, 6);
    return true;
  };

  const checkMoveSet = () => {
    if (!selectedSquare?.moveSet) return false;
    const moveSet = selectedSquare.moveSet;
    const [row, col] = piece.coords;
    const [rowSelected, colSelected] = selectedSquare.coords;
    const isMoveSet = moveSet.some((move: any) => {
      const [rowMove, colMove] = move;
      return rowMove === row && colMove === col;
    });
    const isMoveSetSelected = moveSet.some((move: any) => {
      const [rowMove, colMove] = move;
      return rowMove === rowSelected && colMove === colSelected;
    });
    return isMoveSet || isMoveSetSelected;
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

    const attack = tryAttack();
    console.log(attack, selectedSquare.isMoved, selectedSquare.name);
    if((!attack || !selectedSquare.isMoved) && (selectedSquare.name === "bP" || selectedSquare.name === "wP")){
       selectedSquare.moveSet.length = 2;
    }
    if (!checkMoveSet()) {
      toast.error("Movimiento invalido ❌");
      setScore(selectedSquare.color, -3);
      return;
    }

    newBoard[selectedSquare.coords[0]][selectedSquare.coords[1]] =
      defaultSquare;
    selectedSquare.isMoved = true;
    newBoard[row][col] = selectedSquare;
    setBoard(newBoard);
    setSelectedSquare(defaultSquare);
    toast.success("+3 PUNTOS - Movimiento Valido de las " + turn + " ✔️");
    setScore(selectedSquare.color, 3);
    const moveHistoryMessage = [
      "La pieza",
      getPieceName(selectedSquare),
      "de las",
      selectedSquare.color,
      "se movio a",
      realCoords([row, col]),
    ].join(" ");
    setHistory(moveHistoryMessage);
    changeTurn();
    return true;
  };

  const handleClick = () => {
    if (stateGame !== STATES_GAME.PLAYING) {
      toast.error("El juego no ha iniciado");
      return;
    }
    if (!isPiece && !selectedSquare.isSelected) return;
    delete piece.isSelected;
    if (movePiece()) return;

    const currentSquare = {
      ...piece,
      isSelected: true,
    };
    currentSquare.moveSet =  createMoveSet(currentSquare);
    setSelectedSquare(isPiece ? currentSquare : defaultSquare);
  };

  const handleHover = () => {
    if (!isPiece) {
      setHoverSquare(null);
      return;
    }
    const currentSquare = {
      ...piece,
    };
    setHoverSquare(currentSquare);
  };

  return (
    <div
      className={[
        defaultStyle,
        colorSquare,
        hintLights,
        defaultSize,
        defaultHover,
      ].join(" ")}
      onClick={() => handleClick()}
      onMouseOver={() => handleHover()}
      onMouseOut={() => setHoverSquare(null)}
    >
      {currentPiece}
    </div>
  );
}
