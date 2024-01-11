import { PLAYERS, Piece } from "../types/Piece"

const createDefaultPiece = (color, name): Piece => {
  return {
    name,
    color,
    coords: [9, 9],
    moveSet: null,
    isMoved: false,
    defeatedAtTime: 0
  }
}
const bR = createDefaultPiece(PLAYERS.BLACK, "bR")
const bN = createDefaultPiece(PLAYERS.BLACK, "bN")
const bB = createDefaultPiece(PLAYERS.BLACK, "bB")
const bQ = createDefaultPiece(PLAYERS.BLACK, "bQ")
const bK = createDefaultPiece(PLAYERS.BLACK, "bK")
const bP = createDefaultPiece(PLAYERS.BLACK, "bP")

const wR = createDefaultPiece(PLAYERS.WHITE, "wR")
const wN = createDefaultPiece(PLAYERS.WHITE, "wN")
const wB = createDefaultPiece(PLAYERS.WHITE, "wB")
const wQ = createDefaultPiece(PLAYERS.WHITE, "wQ")
const wK = createDefaultPiece(PLAYERS.WHITE, "wK")
const wP = createDefaultPiece(PLAYERS.WHITE, "wP")

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
  isMoved: false,
  defeatedAtTime: 0
}