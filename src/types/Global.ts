import { Piece, PLAYERS } from "./Piece";

export interface Player {
    score: number,
    defeatedPieces: Piece[],
    time: number,
    isInCheck: boolean,
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

export interface ChessBoard {
    map(arg0: (row: any, rowIndex: any) => import("react").JSX.Element): import("react").ReactNode;
    length: number
    [key: number]: Array<Piece | null>;
  }

export interface InitialState {
    board: ChessBoard,
    [PLAYERS.WHITE]: Player,
    [PLAYERS.BLACK]: Player,
    selectedSquare: Piece | null,
    hoverSquare: Piece | null,
    turn: PLAYERS,
    lastPieceMoved: Piece | null,
    history: any[],
    stateGame: STATES_GAME
    colorLine: string,
    soundDefeatedPiece: HTMLAudioElement,
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
    setLastPieceMoved: (lastPieceMoved: Piece | null) => void,
    setColorLine: (colorLine: string) => void,
    setAudio: (audio: HTMLAudioElement) => void,
}