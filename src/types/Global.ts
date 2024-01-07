import { Piece, TURNS } from "./Piece";

export interface Player {
    score: number,
    defeatedPieces: Piece[],
    time: number,
}

export interface InitialState {
    board: any[][],
    [TURNS.WHITE]: Player,
    [TURNS.BLACK]: Player,
    selectedSquare: Piece | null,
    hoverSquare: Piece | null,
    turn: TURNS,
    history: any[],
}

export interface GameStore extends InitialState {
    setBoard: (board: any[][]) => void,
    setDefeatedPieces: (color: TURNS, newDefeatedPieces: Piece) => void,
    setScore: (color: TURNS, points: number) => void,
    getScore: (color: TURNS) => number,
    setSelectedSquare: (selectedSquare: Piece | null) => void,
    setHoverSquare: (hoverSquare: Piece | null) => void,
    changeTurn: () => void,
    setHistory: (history: any[]) => void,
}