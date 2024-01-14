import { PIECES } from "../media/pieces";
import { useGameStore } from "../store/GameStore";
import { createMoveSet, defaultSquare } from "../constants/global";
import React from "react";
import { Piece, PLAYERS } from "../types/Piece";
import { toast } from "react-toastify";
import { getPieceName, realCoords } from "../utils/global";
import { STATES_GAME } from "../types/global";

export default function Square({ piece }: Readonly<{ piece: Piece }>) {
  const [col, row] = piece.coords;

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
    lastPieceMoved,
    setLastPieceMoved,
    stateGame
  }: any = useGameStore();

  const isPiece = !!piece.name;

  const hintLights =
    col === selectedSquare.coords[0] && row === selectedSquare.coords[1]
      ? "shadow-[inset_0px_1px_8px_4px_#4299e1]"
      : "";

  const defaultSize = "w-12 h-12";
  const defaultHover = "hover:shadow-[inset_0px_1px_8px_4px_#4299e1]";
  const defaultStyle = "cursor-pointer";
  const colorSquare = (row + col) % 2 === 0 ? "bg-white" : "bg-green-900";

  const currentPiece = piece ? PIECES[piece.name] : null;

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
    currentSquare.moveSet = createMoveSet(currentSquare, board, lastPieceMoved);
    setSelectedSquare(isPiece ? currentSquare : defaultSquare);
  };

  const movePiece = () => {
    if (!selectedSquare?.name) return;
    if (selectedSquare?.color !== turn) {
      toast.error(`Es el turno de las ${turn} ✖️`);
      return;
    }
    if (row < 0 || row > 7 || col < 0 || col > 7) return;
    if (piece?.color === turn && piece?.color !== undefined) return;
    let newBoard = [...board];

    if (!checkMoveSet()) {
      toast.error("-3 PUNTOS - Movimiento No Permitido ❌");
      setScore(selectedSquare.color, -3);
      return;
    }

    tryAttack(piece);

    newBoard[selectedSquare.coords[1]][selectedSquare.coords[0]] = null;
    selectedSquare.isMoved = true;
    newBoard[row][col] = selectedSquare;


    const enPassantCapture = checkEnPassantCapture();
    if (enPassantCapture) {
      const [col, row] = enPassantCapture;
      newBoard[row][col] = null;
      tryAttack(lastPieceMoved)
    }

    setBoard(newBoard);
    setSelectedSquare(defaultSquare);
    toast.success(`+3 PUNTOS - Movimiento Valido de las ${turn} ✔️`);
    setScore(selectedSquare.color, 3);
    const moveHistoryMessage = `La pieza ${getPieceName(
      selectedSquare
    )} de las ${selectedSquare.color} se movio a ${realCoords([col, row])}`;
    setHistory(moveHistoryMessage);
    setLastPieceMoved({
      ...selectedSquare,
      coords: [col, row],
      distance: [
        Math.abs(col - selectedSquare.coords[0]),
        Math.abs(row - selectedSquare.coords[1]),
      ],
    });
    changeTurn();
    return true;
  };

  const checkEnPassantCapture = () => {
    const { name, coords } = selectedSquare;
    if (name.includes('P') && lastPieceMoved?.name!.includes('P')) {
      const lastPieceCoords = lastPieceMoved.coords;
      const deltaX = Math.abs(coords[0] - lastPieceCoords[0]);
  
      if (deltaX === 1 && lastPieceMoved.distance[1] === 2) {
        return lastPieceCoords;
      }
    }
  
    return null;
  };

  const tryAttack = (piece) => {
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
      `+6 PUNTOS - La pieza ${getPieceName(
        piece
      )} de las ${color} ha sido derrotada ⚔️`
    );
    setScore(selectedSquare?.color, 6);
    return true;
  };

  const checkMoveSet = () => {
    const { moveSet } = selectedSquare;
    if (!moveSet) return false;
    const [col, row] = piece.coords;
    const isMoveSet = moveSet.some((move: any) => {
      const [rowMove, colMove] = move;
      return rowMove === row && colMove === col;
    });
    return isMoveSet;
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
