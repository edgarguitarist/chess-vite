import { Piece } from "../types/Piece";

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
        wK: {name: "Rey", pronoun: "El"},
        wQ: {name: "Reina", pronoun: "La"},
        wB: {name: "Alfil", pronoun: "El"},
        wN: {name: "Caballo", pronoun: "El"},
        wR: {name: "Torre", pronoun: "La"},
        wP: {name: "Peón", pronoun: "El"},
        bK: {name: "Rey", pronoun: "El"},
        bQ: {name: "Reina", pronoun: "La"},
        bB: {name: "Alfil", pronoun: "El"},
        bN: {name: "Caballo", pronoun: "El"},
        bR: {name: "Torre", pronoun: "La"},
        bP: {name: "Peón", pronoun: "El"},
    };
    const pieza = pieces[name];
    return pronoun ? [pieza.pronoun, pieza.name].join(" ") : pieza.name;
}