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

export const createMoveSet = (piece:Piece) => {
  const { name: pieceName, color: pieceColor, coords } = piece
  if (pieceName === null || pieceColor === null) return null
  switch (pieceName) {
    case "bR":
    case "wR":
      return createRookMoveSet(coords)
    case "bN":
    case "wN":
      return createKnightMoveSet(coords)
    case "bB":
    case "wB":
      return createBishopMoveSet(coords)
    case "bQ":
    case "wQ":
      return createQueenMoveSet(coords)
    case "bK":
    case "wK":
      return createKingMoveSet(coords)
    case "bP":
    case "wP":
      return createPawnMoveSet(pieceColor, coords)
    default:
      return null
  }
}

const createRookMoveSet = (coords: number[]) => {
  const moveSet  = <number[][]>[]
  const [x, y] = coords
  for (let i = 1; i < 8; i++) {
    moveSet.push([x + i, y])
    moveSet.push([x - i, y])
    moveSet.push([x, y + i])
    moveSet.push([x, y - i])
  }
  return moveSet
}


const createKnightMoveSet = (coords: number[]) => {
  const moveSet  = <number[][]>[]
  const [x, y] = coords
  moveSet.push([x + 2, y + 1])
  moveSet.push([x + 2, y - 1])
  moveSet.push([x - 2, y + 1])
  moveSet.push([x - 2, y - 1])
  moveSet.push([x + 1, y + 2])
  moveSet.push([x + 1, y - 2])
  moveSet.push([x - 1, y + 2])
  moveSet.push([x - 1, y - 2])
  return moveSet
}

const createBishopMoveSet = (coords: number[]) => {
  const moveSet  = <number[][]>[]
  const [x, y] = coords
  for (let i = 1; i < 8; i++) {
    moveSet.push([x + i, y + i])
    moveSet.push([x - i, y - i])
    moveSet.push([x - i, y + i])
    moveSet.push([x + i, y - i])
  }
  return moveSet
}

const createQueenMoveSet = (coords: number[]) => {
  const moveSet  = <number[][]>[]
  const [x, y] = coords
  for (let i = 1; i < 8; i++) {
    moveSet.push([x + i, y])
    moveSet.push([x - i, y])
    moveSet.push([x, y + i])
    moveSet.push([x, y - i])
    moveSet.push([x + i, y + i])
    moveSet.push([x - i, y - i])
    moveSet.push([x - i, y + i])
    moveSet.push([x + i, y - i])
  }
  return moveSet
}

const createKingMoveSet = (coords: number[]) => {
  const moveSet  = <number[][]>[]
  const [x, y] = coords
  moveSet.push([x + 1, y])
  moveSet.push([x - 1, y])
  moveSet.push([x, y + 1])
  moveSet.push([x, y - 1])
  moveSet.push([x + 1, y + 1])
  moveSet.push([x - 1, y - 1])
  moveSet.push([x - 1, y + 1])
  moveSet.push([x + 1, y - 1])
  return moveSet
}

const createPawnMoveSet = (pieceColor: PLAYERS, coords: number[]) => {
  const moveSet  = <number[][]>[]
  const [x, y] = coords
  if (pieceColor === PLAYERS.WHITE) {
    moveSet.push([x - 1, y])
    moveSet.push([x - 2, y])
    moveSet.push([x - 1, y + 1])
    moveSet.push([x - 1, y - 1])
  } else {
    moveSet.push([x + 1, y])
    moveSet.push([x + 2, y])
    moveSet.push([x + 1, y + 1])
    moveSet.push([x + 1, y - 1])
  }
  return moveSet
}


