import React from "react";
import { useGameStore } from "../store/GameStore";
export default function GameSettings() {
  const { setColorLine, setAudio } = useGameStore();
  const handleColorLine = (e) => {
    console.log(e.target.value, "colorLine");
    setColorLine(e.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const audio = new Audio(URL.createObjectURL(file));
    setAudio(audio);
  };
  return (
    <>
      <div className="border-2 rounded border-black h-[20vh] grid gap-2 place-content-center px-4">
        <div className="grid grid-flow-col items-center mx-3 place-content-between">
          <span className="font-semibold">Color de Linea</span>
          <input type="color" onInput={handleColorLine} />
        </div>
        <div className="grid grid-flow-col items-center mx-3 place-content-between gap-x-4">
          <label
            className="block mb-2 text-sm font-medium"
            htmlFor="file_input"
          >
            Sonido de Captura
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
          ></input>
        </div>
      </div>
    </>
  );
}
