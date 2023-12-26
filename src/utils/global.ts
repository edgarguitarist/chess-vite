import { Piece } from "../types/Piece";

export function realCoords(coords: number[]) {
    const [y, x] = coords;
    const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
    const numbers = [0, 8, 7, 6, 5, 4, 3, 2, 1];
    return `${letters[x]}${numbers[y]}`;
}

export function getPieceName(piece: Piece) {
    const { name } = piece;
    if (!name) return null;
    const names = {
        wR: "Torre",
        wN: "Caballo",
        wB: "Alfil",
        wQ: "Reina",
        wK: "Rey",
        wP: "Peón",
        bR: "Torre",
        bN: "Caballo",
        bB: "Alfil",
        bQ: "Reina",
        bK: "Rey",
        bP: "Peón",
    };
    return names[name];
}