import React, { useEffect, useState } from "react";
import { useGameStore } from "../store/GameStore";
import { PLAYERS } from "../types/Piece";
import { useTimer } from "react-timer-hook";
import { celebrate } from "../utils/global";
import { STATES_GAME } from "../types/Global";
import { toast } from "react-toastify";

export default function ScoreTimer({ color }: Readonly<{ color: PLAYERS }>) {
  const { getScore, setTime, turn, stateGame, setStateGame, [color]:CurrentColor } =
    useGameStore() as any;

  const PlayerScore = getScore(color);

  const [currentTime, setCurrentTime] = useState(CurrentColor.time);

  // Actualizar currentTime cuando cambie BLANCAS o NEGRAS
  useEffect(() => {
    setCurrentTime(CurrentColor.time);
  }, [CurrentColor, color]);

  const time = new Date();
  time.setSeconds(time.getSeconds() + currentTime);

  const { totalSeconds, seconds, minutes, start, pause, resume, isRunning } =
    useTimer({
      expiryTimestamp: time,
      onExpire: () => {
        setStateGame(STATES_GAME.FINISHED);
        celebrate();
        console.info("Tiempo Terminado");
      },
      autoStart: false,
    });

  useEffect(() => {
    setTime(color, totalSeconds);
    if (totalSeconds === 0) {
      pause();
      toast.error(["Se acabó el tiempo, pierden las", color].join(" "));
    }
  }, [totalSeconds]);

  useEffect(() => {
    if (turn === color && stateGame === STATES_GAME.NEW_GAME && !isRunning) {
      start();
      setStateGame(STATES_GAME.PLAYING);
    }
  }, [stateGame]);

  useEffect(() => {
    if (turn !== color && isRunning && stateGame === STATES_GAME.PLAYING) {
      pause();
    }
    if (turn === color && !isRunning && stateGame === STATES_GAME.PLAYING) {
      resume();
    }
  }, [turn]);

  return (
    <div className="flex justify-between text-xl font-semibold my-4 bg-slate-800 text-white px-5 rounded-xl py-0.5 h-10 items-center w-full">
      <div className="flex place-items-center">
        <span className="border-r-2 pr-5 mr-5">SCORE</span>
        <span>{PlayerScore?.toString()}</span>
      </div>
      <div>
        <span>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
