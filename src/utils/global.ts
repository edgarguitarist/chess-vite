import { Piece } from "../types/Piece";
import confetti from "canvas-confetti";

export function realCoords(coords: number[]) {
    const [y, x] = coords;
    const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
    const numbers = [0, 8, 7, 6, 5, 4, 3, 2, 1];
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
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
