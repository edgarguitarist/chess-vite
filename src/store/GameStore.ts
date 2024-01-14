import { create } from "zustand";
import { defaultBoard, defaultSquare } from "../constants/global";
import { PLAYERS } from "../types/Piece";
import { GameStore, InitialState, STATES_GAME } from "../types/Global";

const initialState: InitialState = {
    board: defaultBoard,
    [PLAYERS.BLACK]: {
        defeatedPieces: [],
        score: 0,
        time: 10
    },
    [PLAYERS.WHITE]: {
        defeatedPieces: [],
        score: 0,
        time: 10
    },
    selectedSquare: defaultSquare,
    hoverSquare: defaultSquare,
    turn: PLAYERS.WHITE,
    lastPieceMoved: null,
    history: [],
    stateGame: STATES_GAME.WAITING,
};

export const useGameStore = create<GameStore>((set, get) => ({
    ...initialState,
    setBoard: (board) => set({ board }),
    setStateGame: (stateGame) => set({ stateGame }),
    setDefeatedPieces: (color, newDefeatedPiece) => set((state) => ({
        [color]: {
            ...state[color],
            defeatedPieces: [...get()[color].defeatedPieces, newDefeatedPiece],
        },
    })),
    setTime: (color, time) => set((state) => ({
        [color]: {
            ...state[color],
            time,
        },
    })),
    getTime: (color) => get()[color].time,
    setScore: (color, points) => set((state) => ({
        [color]: {
            ...state[color],
            score: (state[color].score + points),
        },
    })),
    getScore: (color) => get()[color].score,
    setSelectedSquare: (selectedSquare) => set({ selectedSquare }),
    setHoverSquare: (hoverSquare) => set({ hoverSquare }),
    changeTurn: () => set((state) => ({
        turn: state.turn === PLAYERS.WHITE ? PLAYERS.BLACK : PLAYERS.WHITE,
    })),
    setLastPieceMoved: (lastPieceMoved) => set({ lastPieceMoved }),
    setHistory: (newHistory) => set({ history: [newHistory, ...get().history] }),
}));