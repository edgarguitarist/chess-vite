import React from "react";
import { useGameStore } from "../store/GameStore";
export default function GameSettings() {
  const { setColorLine } = useGameStore();
  const handleColorLine = (e) => {
    console.log(e.target.value, "colorLine");
    setColorLine(e.target.value);
  };
  return (
    <>
      <div className="border-2 rounded border-black h-[20vh] grid gap-2 place-content-center px-4">
        <div className="grid grid-flow-col items-center mx-3 place-content-between">
          <span className="font-semibold">Color de Linea</span>
          <input type="color" onInput={handleColorLine}/>
        </div>
        <div className="grid grid-flow-col items-center mx-3 place-content-between gap-x-4">
          <span className="font-semibold">Sonido de Captura</span>
          <input
            type="file"
            name="sonido_captura"
            id="sonido_captura"
            accept="audio/*"
          />
        </div>
      </div>
    </>
  );
}
