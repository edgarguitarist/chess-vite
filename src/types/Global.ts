import { Piece, TURNS } from "./Piece";

export interface InitialState {
    board: any[][],
    blackDefeatedPieces: Piece[],
    whiteDefeatedPieces: Piece[],
    selectedSquare: Piece | null,
    isPieceSelected: boolean,
    turn: TURNS,
}