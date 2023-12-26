import { create } from "zustand";
import { BoardStore, defaultBoard, defaultSquare } from "../constants/global";
import { TURNS } from "../types/Piece";
import { InitialState } from "../types/global";

const initialState: InitialState = {
    board: defaultBoard,
    blackDefeatedPieces: [],
    whiteDefeatedPieces: [],
    selectedSquare: defaultSquare,
    isPieceSelected: false,
    turn: TURNS.WHITE,
};

export const useBoardStore = create((set): BoardStore => ({
    ...initialState,
    setBoard: (board) => set({ board }),
    setBlackDefeatedPieces: (blackDefeatedPieces) => set({ blackDefeatedPieces }),
    setWhiteDefeatedPieces: (whiteDefeatedPieces) => set({ whiteDefeatedPieces }),
    setSelectedSquare: (selectedSquare) => set({ selectedSquare }),
    setIsPieceSelected: (isPieceSelected) => set({ isPieceSelected }),
    changeTurn: () => set((state) => ({
        turn: state.turn === TURNS.WHITE ? TURNS.BLACK : TURNS.WHITE,
    })),
    reset: () => set({ ...initialState }),
}));