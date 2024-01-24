import React, { useEffect } from "react";
import { useGameStore } from "../store/GameStore";
import { toast } from "react-toastify";
import { celebrate } from "../utils/global";
import { STATES_GAME } from "../types/Global";

export default function ModalWinner() {
  const { stateGame, turn } = useGameStore();
  useEffect(() => {
    if (stateGame === STATES_GAME.CHECKMATE || stateGame === STATES_GAME.FINISHED) {
      celebrate();
    }
  }, [stateGame]);

  return (
    <>
      {stateGame === STATES_GAME.CHECKMATE && (
        <div className="fixed z-0 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-slate-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[40%] h-[50%]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col gap-y-4 items-center">
                  <div className="font-bold text-2xl text-gray-900">
                    ¡El ganador es {turn}!
                  </div>
                  <div className="font-bold text-2xl text-gray-900">
                    ¡Felicidades! 🥳
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        toast.dismiss();
                        window.location.reload();
                      }}
                    >
                      Volver a jugar
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
