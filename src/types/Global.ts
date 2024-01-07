import { Piece, PLAYERS } from "./Piece";

export interface Player {
    score: number,
    defeatedPieces: Piece[],
    time: number,
}

export interface InitialState {
    board: any[][],
    [PLAYERS.WHITE]: Player,
    [PLAYERS.BLACK]: Player,
    selectedSquare: Piece | null,
    hoverSquare: Piece | null,
    turn: PLAYERS,
    history: any[],
}

export interface GameStore extends InitialState {
    setBoard: (board: any[][]) => void,
    setDefeatedPieces: (color: PLAYERS, newDefeatedPieces: Piece) => void,
    setScore: (color: PLAYERS, points: number) => void,
    getScore: (color: PLAYERS) => number,
    setSelectedSquare: (selectedSquare: Piece | null) => void,
    setHoverSquare: (hoverSquare: Piece | null) => void,
    changeTurn: () => void,
    setHistory: (history: any[]) => void,
}