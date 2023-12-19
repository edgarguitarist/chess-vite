const createDefaultPiece = (color, name) => {
  return {
    name,
    color,
    coords: [null, null],
    isSelected: false,
    defeated: false,
    moveSet: null,
  }
}
const bR = createDefaultPiece("black", "bR")
const bN = createDefaultPiece("black", "bN")
const bB = createDefaultPiece("black", "bB")
const bQ = createDefaultPiece("black", "bQ")
const bK = createDefaultPiece("black", "bK")
const bP = createDefaultPiece("black", "bP")

const wR = createDefaultPiece("white", "wR")
const wN = createDefaultPiece("white", "wN")
const wB = createDefaultPiece("white", "wB")
const wQ = createDefaultPiece("white", "wQ")
const wK = createDefaultPiece("white", "wK")
const wP = createDefaultPiece("white", "wP")

export const defaultBoard = [
  [bR, bN, bB, bQ, bK, bB, bN, bR],
  Array(8).fill(bP),
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  Array(8).fill(wP),
  [wR, wN, wB, wQ, wK, wB, wN, wR],
]

export const defaultSquare = {
  name: null,
  color: null,
  coords: [null, null],
}