import { TURNS, Piece } from "../types/Piece"

const createDefaultPiece = (color, name):Piece => {
  return {
    name,
    color,
    coords: [9, 9],
    defeated: false,
    moveSet: null,
  }
}
const bR = createDefaultPiece(TURNS.BLACK, "bR")
const bN = createDefaultPiece(TURNS.BLACK, "bN")
const bB = createDefaultPiece(TURNS.BLACK, "bB")
const bQ = createDefaultPiece(TURNS.BLACK, "bQ")
const bK = createDefaultPiece(TURNS.BLACK, "bK")
const bP = createDefaultPiece(TURNS.BLACK, "bP")

const wR = createDefaultPiece(TURNS.WHITE, "wR")
const wN = createDefaultPiece(TURNS.WHITE, "wN")
const wB = createDefaultPiece(TURNS.WHITE, "wB")
const wQ = createDefaultPiece(TURNS.WHITE, "wQ")
const wK = createDefaultPiece(TURNS.WHITE, "wK")
const wP = createDefaultPiece(TURNS.WHITE, "wP")

export const defaultBoard = [
  [1, wR, wN, wB, wQ, wK, wB, wN, wR].flat(),
  [2, Array(8).fill(wP)].flat(),
  [3, Array(8).fill(null)].flat(),
  [4, Array(8).fill(null)].flat(),
  [5, Array(8).fill(null)].flat(),
  [6, Array(8).fill(null)].flat(),
  [7, Array(8).fill(bP)].flat(),
  [8, bR, bN, bB, bQ, bK, bB, bN, bR].flat(),
  [0, "A", "B", "C", "D", "E", "F", "G", "H"],
].reverse();

export const defaultSquare: Piece = {
  name: null,
  color: null,
  coords: [0, 0],
  defeated: false,
  moveSet: null,
}

export interface BoardStore {
  board: any[][],
  blackDefeatedPieces: Piece[],
  whiteDefeatedPieces: Piece[],
  selectedSquare: Piece | null,
  isPieceSelected: boolean,
  turn: TURNS,
  setBoard: (board: any[][]) => void,
  setBlackDefeatedPieces: (blackDefeatedPieces: Piece[]) => void,
  setWhiteDefeatedPieces: (whiteDefeatedPieces: Piece[]) => void,
  setSelectedSquare: (selectedSquare: Piece | null) => void,
  setIsPieceSelected: (isPieceSelected: boolean) => void,
  changeTurn: () => void,
  reset: () => void,
}