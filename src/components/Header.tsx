import { toast } from "react-toastify";
import { useGameStore } from "../store/GameStore.ts";

import React from "react";
import { STATES_GAME } from "../types/Global.ts";
import { SVGS } from "../media/svgs.jsx";

export default function Header() {
  const { stateGame, setStateGame, setGlobalState, ...res } = useGameStore();
  
  const handleClick = () => {
    if (stateGame === STATES_GAME.WAITING) {
      setStateGame(STATES_GAME.NEW_GAME);
      toast.info("Juego iniciado", { autoClose: 1000 });
    } else {
      window.location.reload();
      toast.info("Juego reiniciado", { autoClose: 1000 });
    }
  };

  const handleDownload = () => {
    let newObject = { stateGame };
    Object.keys(res).forEach((key) => {
      if (typeof res[key] !== "function" && key !== "soundDefeatedPiece") {
        newObject[key] = res[key];
      }
    });
    console.log(newObject);
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(newObject)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    const name = new Date().toLocaleDateString("fr-CA");
    element.download = `${name}.chess`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    toast.info("Partida guardada", { autoClose: 1000 });
  };

  const handleUpload = (e) => {

    const file = e.target.files[0];
    //si el archivo es mayor 10 kb
    if (file.size > 20000) {
      toast.error("Esta no es una partida valida");
      //borrar el archivo del input
      e.target.value = "";
      return;
    }

    //si el archivo no tiene la extension .chess
    if (!file.name.endsWith(".chess")) {
      toast.error("Esta no es una partida valida, no tiene la extension .chess");
      //borrar el archivo del input
      e.target.value = "";
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target) {
          return;
        }
        const content = e.target.result;
        const data = JSON.parse(content) ;

        setGlobalState(data);
        toast.info("Partida cargada", { autoClose: 1000 });
      };
      reader.readAsText(file);
    }

  };

  return (
    <div className="h-[10vh] bg-slate-800 ring-1 ring-slate-900/5 shadow-xl flex justify-between items-center px-10">
      <span className="text-3xl font-bold text-white">AJEDREZ</span>
      <div className="grid grid-flow-col gap-x-4">
        <button
          type="button"
          className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 hover:scale-105 hover:font-semibold"
          onClick={handleClick}
        >
          { STATES_GAME.WAITING === stateGame ? "Iniciar" : "Reiniciar"}
        </button>
        <button
          type="button"
          title="Exportar partida"
          className="py-2.5 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 place-self-center hover:text-blue-700 hover:scale-105 hover:font-semibold"
          onClick={handleDownload}
        >
          {SVGS.download}
        </button>
        <label
          title="Importar partida"
          htmlFor="uploadFile1"
          className="py-2.5 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 place-self-center hover:text-blue-700 hover:scale-105 hover:font-semibold"          
        >
          {SVGS.upload}
          <input type="file" id="uploadFile1" className="hidden" onChange={handleUpload}/>
        </label>
      </div>
    </div>
  );
}
