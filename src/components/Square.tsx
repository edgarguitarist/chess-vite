import { PIECES } from "../media/pieces";
import { useGameStore } from "../store/GameStore";
import {
  createMoveSet,
  defaultSquare,
  isInCheck,
  isCheckmate,
} from "../constants/global";
import React, { useMemo } from "react";
import { Piece, PLAYERS } from "../types/Piece";
import { toast } from "react-toastify";
import { generateRandomComments, getPieceName, realCoords } from "../utils/global";
import { STATES_GAME } from "../types/Global";

const Square = React.memo(
  ({
    piece,
    posibleMoveLight,
  }: Readonly<{ piece: Piece; posibleMoveLight: boolean }>) => {
    const [col, row] = piece.coords;
    const { color } = piece;

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
      stateGame,
      setStateGame,
      soundDefeatedPiece,
    }: any = useGameStore();

    const isPiece = !!piece.name;

    const movesLight = posibleMoveLight
      ? "shadow-[inset_0px_1px_8px_4px_#10F000]"
      : "";

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
      if (stateGame === STATES_GAME.WAITING || stateGame === STATES_GAME.WAITING) {
        toast.error("El juego no ha iniciado");
        return;
      }
      if (stateGame === STATES_GAME.CHECKMATE) {
        toast.error("El juego ha terminado");
        return;
      }
      if (!isPiece && !selectedSquare.isSelected) return;
      delete piece.isSelected;
      if (movePiece()) return;

      const currentSquare = {
        ...piece,
        isSelected: true,
      };
      currentSquare.moveSet = createMoveSet(
        currentSquare,
        board,
        lastPieceMoved
      );
      setSelectedSquare(isPiece ? currentSquare : defaultSquare);
    };

    const lastCoords = [...selectedSquare.coords];

    const movePiece = () => {
      if (!selectedSquare?.name) return;
      if (selectedSquare?.color !== turn) {
        toast.error(`Es el turno de las ${turn} ✖️`);
        return;
      }
      if (row < 0 || row > 7 || col < 0 || col > 7) return;
      if (piece?.color === turn && piece?.color !== undefined) return;
      //retornar si la pieza es el rey
      //console.log(piece);
      let newBoard = [...board];

      if (!checkMoveSet()) {
        toast.error("-3 PUNTOS - Movimiento No Permitido ❌");
        setScore(selectedSquare.color, -3);
        return;
      }

      tryAttack(piece);

      newBoard[selectedSquare.coords[1]][selectedSquare.coords[0]] = null;
      selectedSquare.isMoved = true;
      selectedSquare.coords = [col, row];
      newBoard[row][col] = selectedSquare;

      const enPassantCapture = checkEnPassantCapture();
      if (enPassantCapture) {
        const [col, row] = enPassantCapture;
        console.log({ enPassantCapture, lastCoords });
        const deltaX = Math.abs(lastCoords[0] - enPassantCapture[0]);
        if (deltaX === 1 && enPassantCapture[0] === selectedSquare.coords[0]) {
          newBoard[row][col] = null;
          tryAttack(lastPieceMoved);
        }
      }

      setBoard(newBoard);
      setSelectedSquare(defaultSquare);
      toast.success(`+3 PUNTOS - Movimiento Valido de las ${turn} ✔️`);
      setScore(selectedSquare.color, 3);
      let moveHistoryMessage = generateRandomComments(getPieceName(
        selectedSquare
      ), selectedSquare.color, realCoords([col, row]), getTime(selectedSquare.color), piece);
      setHistory(moveHistoryMessage);
      setLastPieceMoved({
        ...selectedSquare,
        coords: [col, row],
        distance: [
          Math.abs(col - lastCoords[0]), //x
          Math.abs(row - lastCoords[1]), //y
        ],
      });

      const colorEnemy = turn === PLAYERS.WHITE ? PLAYERS.BLACK : PLAYERS.WHITE;
      
      if (isInCheck(colorEnemy, [...newBoard])) {
        toast.success(
          `+9 PUNTOS PARA LAS ${turn} - EL REY DE LAS ${colorEnemy} ESTA EN JAQUE`
        );
        setStateGame(STATES_GAME.CHECK);
        setScore(turn, 9);
        setScore(colorEnemy, -9);
      } else {
        setStateGame(STATES_GAME.PLAYING);
      }
      if (isCheckmate(colorEnemy, [...newBoard])) {
        setStateGame(STATES_GAME.CHECKMATE);
        toast.success(
          `EL JUEGO HA TERMINADO! - EL REY DE LAS ${colorEnemy} ESTA EN JAQUE MATE`
        );
        return true;
      }
      changeTurn();
      return true;
    };

    const checkEnPassantCapture = () => {
      const { name, coords } = selectedSquare;
      if (name.includes("P") && lastPieceMoved?.name!.includes("P")) {
        const lastPieceCoords = lastPieceMoved.coords;
        const deltaX = Math.abs(lastCoords[0] - lastPieceCoords[0]);
        const deltaY = Math.abs(lastCoords[1] - lastPieceCoords[1]);
        console.log({ deltaX, deltaY, distance: lastPieceMoved.distance });
        if (deltaX === 1 && deltaY === 0 && lastPieceMoved.distance[1] === 2) {
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

      soundDefeatedPiece.play();
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
          movesLight,
          hintLights,
          defaultSize,
          defaultHover,
        ].join(" ")}
        onClick={() => handleClick()}
        onMouseOver={() => handleHover()}
        onMouseOut={() => setHoverSquare(null)}
        data-color={color}
      >
        {currentPiece}
      </div>
    );
  }
);

export default Square;
