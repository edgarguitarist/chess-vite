import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import Header from "./components/Header";
import Principal from "./layouts/Principal";
import { useBoardStore } from "./store/BoardStore";
import React from "react";
import { Piece } from "./types/Piece";
import { PIECES } from "./media/pieces";
import { realCoords, getPieceName } from "./utils/global";

function App() {
  const { selectedSquare }: { selectedSquare: Piece } = useBoardStore();

  return (
    <>
      <Header />
      <Principal>
        <GameInfo />
        <Board />
        <div>
          <div className="w-full flex items-end gap-4">
            Pieza seleccionada:{" "}
            {!selectedSquare.name ? "N/A" : PIECES[selectedSquare.name]}
          </div>
          <div className="w-full flex items-center gap-4">
            Nombre:{" "}
            {!selectedSquare.name ? "N/A" : getPieceName(selectedSquare)}
          </div>
          <div className="w-full flex items-center gap-4">
            Color: {!selectedSquare.color ? "N/A" : selectedSquare.color}
          </div>
          <div className="w-full flex items-center gap-4">
            Coordenadas:{" "}
            {selectedSquare.coords[0] === 0
              ? "N/A"
              : realCoords(selectedSquare.coords)}
          </div>
        </div>
      </Principal>
    </>
  );
}

export default App;
