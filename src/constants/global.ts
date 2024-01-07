import { TURNS, Piece } from "../types/Piece"

const createDefaultPiece = (color, name):Piece => {
  return {
    name,
    color,
    coords: [9, 9],
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
  [0, "A", "B", "C", "D", "E", "F", "G", "H"],
  [8, bR, bN, bB, bQ, bK, bB, bN, bR].flat(),
  [7, Array(8).fill(bP)].flat(),
  [6, Array(8).fill(null)].flat(),
  [5, Array(8).fill(null)].flat(),
  [4, Array(8).fill(null)].flat(),
  [3, Array(8).fill(null)].flat(),
  [2, Array(8).fill(wP)].flat(),
  [1, wR, wN, wB, wQ, wK, wB, wN, wR].flat(),
];

export const defaultSquare: Piece = {
  name: null,
  color: null,
  coords: [0, 0],
  moveSet: null,
}