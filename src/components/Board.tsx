import { useGameStore } from "../store/GameStore";
import Square from "./Square";
import ScoreTimer from "./ScoreTimer";
import { PLAYERS } from "../types/Piece";
import { letters, numbers } from "../constants/global";
import { realCoords } from "../utils/global";
import React from "react";

export default function Board() {
  const { board, selectedSquare } = useGameStore();

  const getLightSquares = (coords):boolean => {
    return selectedSquare?.moveSet.some((move) => {
      return move[0] === coords[1] && move[1] === coords[0];
    }) || false;
  }

  return (
    <section className="flex flex-col justify-between my-2 items-center">
      <ScoreTimer color={PLAYERS.BLACK} />
      <div className="grid grid-board border-2 border-black">
        <div></div>
        <div className="grid grid-cols-8 justify-items-center bg-gray-300 text-center font-semibold">
          {letters.map((value) => {
            return <div key={value}>{value}</div>;
          })}
        </div>
        <div className="grid grid-rows-8 place-items-center bg-gray-300 text-center font-semibold">
          {numbers.map((value) => {
            return <div key={value}>{value}</div>;
          })}
        </div>
        <div className=" w-fit grid rows-board gap-0">
          {board.map((row, rowIndex) => {
            return (
              <div className="grid cols-board gap-0" key={rowIndex}>
                {row.map((piece, colIndex) => {
                  return (
                    <Square
                      key={realCoords([colIndex, rowIndex])}
                      piece={{ ...piece, coords: [colIndex, rowIndex] }}
                      posibleMoveLight={getLightSquares([colIndex, rowIndex])}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <ScoreTimer color={PLAYERS.WHITE} />
    </section>
  );
}
