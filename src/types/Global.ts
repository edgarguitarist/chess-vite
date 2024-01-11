import { Piece, PLAYERS } from "./Piece";

export interface Player {
    score: number,
    defeatedPieces: Piece[],
    time: number,
}

export enum STATES_GAME {
    WAITING = "WAITING",
    NEW_GAME = "NEW_GAME",
    PLAYING = "PLAYING",
    CHECK = "CHECK",
    CHECKMATE = "CHECKMATE",
    STALEMATE = "STALEMATE",
    DRAW = "DRAW",
}

export enum GAME_ACTIONS {
    START = "COMENZAR UNA PARTIDA",
    RESTART = "REINICIAR LA PARTIDA",
    SAVE = "GUARDAR LA PARTIDA",
}

export interface InitialState {
    board: any[][],
    [PLAYERS.WHITE]: Player,
    [PLAYERS.BLACK]: Player,
    selectedSquare: Piece | null,
    hoverSquare: Piece | null,
    turn: PLAYERS,
    history: any[],
    stateGame: STATES_GAME
}

export interface GameStore extends InitialState {
    setBoard: (board: any[][]) => void,
    setStateGame: (stateGame: STATES_GAME) => void,
    setDefeatedPieces: (color: PLAYERS, newDefeatedPieces: Piece) => void,
    setTime: (color: PLAYERS, time: number) => void,
    getTime: (color: PLAYERS) => number,
    setScore: (color: PLAYERS, points: number) => void,
    getScore: (color: PLAYERS) => number,
    setSelectedSquare: (selectedSquare: Piece | null) => void,
    setHoverSquare: (hoverSquare: Piece | null) => void,
    changeTurn: () => void,
    setHistory: (history: any[]) => void,
}