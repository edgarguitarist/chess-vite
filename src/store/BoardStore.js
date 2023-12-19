import { create } from "zustand";
import { defaultBoard, defaultSquare } from "../constants/global";

const TURNS = {
    WHITE: "white",
    BLACK: "black",
};

const initialState = {
    board: defaultBoard,
    selectedSquare: defaultSquare,
    isPieceSelected: false,
    turn: TURNS.WHITE,
};

export const useBoardStore = create((set) => ({
    ...initialState,
    setBoard: (board) => set({ board }),
    setSelectedSquare: (selectedSquare) => set({ selectedSquare }),
    setIsPieceSelected: (isPieceSelected) => set({ isPieceSelected }),
    changeTurn: () => set((state) => ({
        turn: state.turn === TURNS.WHITE ? TURNS.BLACK : TURNS.WHITE,
    })),
    reset: () => set({ ...initialState }),
}));