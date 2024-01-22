import { useGameStore } from "../store/GameStore";
import Square from "./Square";
import ScoreTimer from "./ScoreTimer";
import { PLAYERS } from "../types/Piece";
import { letters, numbers } from "../constants/global";
import { realCoords } from "../utils/global";
import React, { useEffect, useState } from "react";

export default function Board() {
  const { board, selectedSquare, colorLine } = useGameStore();
  const [selectedElement, setSelectedElement] = useState(null);
  const [clickedElementState, setClickedElementState] = useState(null);

  const getLightSquares = (coords): boolean => {
    return (
      selectedSquare?.moveSet.some((move) => {
        return move[0] === coords[1] && move[1] === coords[0];
      }) || false
    );
  };

  const handleCanvasRemoval = () => {
    document.body
      .querySelectorAll("canvas")
      .forEach((canvas) => canvas.remove());
  };

  useEffect(() => {
    if (selectedElement && clickedElementState) {
      drawLine(selectedElement, clickedElementState);
      setSelectedElement(null);
      setClickedElementState(null);
      setTimeout(() => {
        handleCanvasRemoval()
      }, 2000);
    }
  }, [selectedElement, clickedElementState]);

  const handleClick = (event) => {
    let clickedElement = event.target;

    handleCanvasRemoval();

    //si no hay elemento seleccionado entonces el clickedElement es el elemento seleccionado
    //if( ) return;
    clickedElement = clickedElement.getBoundingClientRect()
    if (!selectedElement) {
      setSelectedElement(clickedElement);
      return;
    }else{
      //si hay un elemento seleccionado y el clickedElement es el mismo elemento seleccionado entonces se deselecciona
      if(selectedElement === clickedElement){
        setSelectedElement(null);
        return;
      }

      //si hay un elemento seleccionado y el clickedElement es otro elemento entonces se hace el movimiento
      if(selectedElement !== clickedElement){
        setClickedElementState(clickedElement);
        return;
      }

    }
    
  };

  const drawLine = (rect1, rect2) => {
    //const rect1 = element1.getBoundingClientRect();
    //const rect2 = element2.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;

    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top + rect2.height / 2;

    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    ctx!.strokeStyle = colorLine;
    ctx!.lineWidth = 3;

    ctx!.beginPath();
    ctx!.moveTo(x1, y1);
    ctx!.lineTo(x2, y2);
    ctx!.stroke();

    // Position the canvas absolutely on the page
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";

    document.body.appendChild(canvas);
  };

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
        <div id="grid" onClick={handleClick}>
          <div className="w-fit grid rows-board gap-0">
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
      </div>

      <ScoreTimer color={PLAYERS.WHITE} />
    </section>
  );
}
