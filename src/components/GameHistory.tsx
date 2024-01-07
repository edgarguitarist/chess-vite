import React from "react";
import { useGameStore } from "../store/GameStore";

export default function GameHistory() {
  const { history } = useGameStore() as any;
  return (
    <div className="text-2xl font-semibold border-2 rounded border-black overflow-y-scroll h-[70vh]">
      <ul className="w-full text-sm font-medium ">
        {!history.length && (
          <li className="w-full text-center px-4 py-2 bg-gray-200 text-lg">
            No hay movimientos registrados.
          </li>
        )}
        {history.length > 0 &&
          history.map((item: any, index: number) => {
            const bgColor = index % 2 === 0 ? "bg-gray-200" : "bg-gray-400";
            return (
              <li
                key={index}
                className={["w-full px-4 py-2", bgColor].join(" ")}
              >
                {history?.length - index + ".- " + item}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
