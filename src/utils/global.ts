import { PLAYERS, Piece } from "../types/Piece";
import confetti from "canvas-confetti";

export function realCoords(coords: number[]) {
    const [x, y] = coords;
    if (x < 0 || x > 7 || y < 0 || y > 7) return 'N/A';
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const numbers = [8, 7, 6, 5, 4, 3, 2, 1];
    return `${letters[x]}${numbers[y]}`;
}

export function getPieceName(piece: Piece, pronoun: boolean = false) {
    const { name } = piece;
    if (!name) return null;
    const pieces = {
        wK: { name: "Rey", pronoun: "El" },
        wQ: { name: "Reina", pronoun: "La" },
        wB: { name: "Alfil", pronoun: "El" },
        wN: { name: "Caballo", pronoun: "El" },
        wR: { name: "Torre", pronoun: "La" },
        wP: { name: "Peón", pronoun: "El" },
        bK: { name: "Rey", pronoun: "El" },
        bQ: { name: "Reina", pronoun: "La" },
        bB: { name: "Alfil", pronoun: "El" },
        bN: { name: "Caballo", pronoun: "El" },
        bR: { name: "Torre", pronoun: "La" },
        bP: { name: "Peón", pronoun: "El" },
    };
    const pieza = pieces[name];
    return pronoun ? [pieza.pronoun, pieza.name].join(" ") : pieza.name;
}


export function getTimeString(time: number) {
    if (!time) return "00:00";
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
}


export function celebrate() {
    var duration = 20 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const audio = new Audio("/chess-vite/audio/fireworks.mp3");
    audio.play();
    //cuando finale el audio volver a reproducirlo
    let counter = 0;
    audio.onended = () => {
        counter++;
        if (counter < 2) audio.play();
    }


    var interval = setInterval(function () {

        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}

const convertSecondsToMinutesAndSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft}`;
}

export const generateRandomComments = (name, color, coords, time, defeatedPiece) => {
    const colorEnemy = color === PLAYERS.WHITE ? PLAYERS.BLACK : PLAYERS.WHITE;
    let comments: string[] = [];
    if (defeatedPiece && defeatedPiece.name) {
        let { name:defeatedName, coords:defeatedCoords } = defeatedPiece;
        defeatedName = getPieceName(defeatedPiece, true);
        defeatedCoords = realCoords(defeatedCoords);
        const AttackComments = [
            `Wow... ${name} de las ${color} ha derrotado a ${defeatedName} de las ${colorEnemy} en ${defeatedCoords}`,
            `¡Qué jugada! ${name} ha destrozado a ${defeatedName} en ${defeatedCoords}`,
            `Quedan ${convertSecondsToMinutesAndSeconds(time)} segundos y ${name} ha acabado con ${defeatedName} en ${defeatedCoords}`,
            `Que jugada tan buena de ${name} de las ${color} que ha acabado con ${defeatedName} en ${defeatedCoords}`,
            `¡${name} ha fulminado con ${defeatedName} en ${defeatedCoords}!`,
            `No me lo puedo creer, ${name} ha mandado a dormir a ${defeatedName} en ${defeatedCoords}`,
            `Que posicion mas peligrosas para ${defeatedName} en ${defeatedCoords}, ${name} ha hecho una masacre`,
        ];
        comments = [...AttackComments];
    } else {
        const NormalComments = [
            `¡Qué jugada! ${name} de las ${color} se ha movido a ${coords} con ${convertSecondsToMinutesAndSeconds(time)} segundos restantes`,
            `Que jugada tan buena de ${name} de las ${color} que se ha movido a ${coords} con ${convertSecondsToMinutesAndSeconds(time)} segundos restantes`,
            `¡${name} ha movido a ${coords}! ¡Que jugada!`,
            `No me lo puedo creer, ${name} ha movido a ${coords} con ${convertSecondsToMinutesAndSeconds(time)} segundos restantes`,
            `Que jugada mas rara de ${name} de las ${color} que se ha movido a ${coords}`,
            `Que ingenio, no esperarba ese movimiento de ${name} de las ${color} que se ha movido a ${coords}`,
            `Que posicion mas peligrosas para ${name} en ${coords}`,	
            `${name} de las ${color} deberia tener cuidado`,
            `Esa Jugada de ${name} de las ${color} creo deberia habersela pensado un poco más`,
            `Uy uy uy, ${name} de las ${color} se ha movido a ${coords} con ${convertSecondsToMinutesAndSeconds(time)} segundos restantes`,
            `Esa jugada de ${name} de las ${color} no me ha gustado nada`,
        ];
        comments = [...NormalComments];
    }


    return comments[Math.floor(Math.random() * comments.length)];


}