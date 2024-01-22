import { toast } from "react-toastify";
import { useGameStore } from "../store/GameStore.ts";

import React, { useState } from "react";
import { GAME_ACTIONS, STATES_GAME } from "../types/Global.ts";

export default function Header() {
  const { stateGame, setStateGame } = useGameStore();
  const [buttonActionName, setButtonActionName] = useState(GAME_ACTIONS.START);

  const handleClick = () => {
    if (stateGame === STATES_GAME.WAITING) {
      setStateGame(STATES_GAME.NEW_GAME);
      setButtonActionName(GAME_ACTIONS.RESTART);
      toast.info("Juego iniciado", { autoClose: 1000 });
    } else {
      window.location.reload();
      toast.info("Juego reiniciado", { autoClose: 1000 });
    }
  };

  const handleClick2 = () => {
    setStateGame(STATES_GAME.CHECKMATE);
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
          {buttonActionName}
        </button>
        {/* <button
        type="button"
        className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 hover:scale-105 hover:font-semibold"
        onClick={handleClick2}
      >
        CARGAR PARTIDA
      </button> */}
      </div>
    </div>
  );
}
