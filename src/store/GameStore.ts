import { create } from "zustand";
import { defaultBoard, defaultSquare } from "../constants/global";
import { TURNS } from "../types/Piece";
import { GameStore, InitialState } from "../types/global";

const initialState: InitialState = {
    board: defaultBoard,
    [TURNS.BLACK]: {
        defeatedPieces: [],
        score: 0,
        time: 10
    },
    [TURNS.WHITE]: {
        defeatedPieces: [],
        score: 0,
        time: 10
    },
    selectedSquare: defaultSquare,
    hoverSquare: defaultSquare,
    turn: TURNS.WHITE,
    history: [],
};

export const useGameStore = create<GameStore>((set, get) => ({
    ...initialState,
    setBoard: (board) => set({ board }),
    setDefeatedPieces: (color, newDefeatedPiece) => set((state) => ({
        [color]: {
            ...state[color],
            defeatedPieces: [...get()[color].defeatedPieces, newDefeatedPiece],
        },
    })),
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
        turn: state.turn === TURNS.WHITE ? TURNS.BLACK : TURNS.WHITE,
    })),
    setHistory: (newHistory) => set({ history: [newHistory, ...get().history] }),
}));