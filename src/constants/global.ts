import { PLAYERS, Piece } from "../types/Piece"
import { ChessBoard } from "../types/global"

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


export const letters = ["A", "B", "C", "D", "E", "F", "G", "H"]
//export const letters = ["0", "1", "2", "3", "4", "5", "6", "7"]
export const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse()
//export const numbers = ["0", "1", "2", "3", "4", "5", "6", "7"]


const bStrongs = [bR, bN, bB, bQ, bK, bB, bN, bR].map((piece, index) => {
  piece.coords = [0, index]
  return piece
})

const bPawns = Array(8).fill(bP).map((piece, index) => {
  piece.coords = [1, index]
  return piece
})
const wStrongs = [wR, wN, wB, wQ, wK, wB, wN, wR].map((piece, index) => {
  piece.coords = [7, index]
  return piece
})
const wPawns = Array(8).fill(wP).map((piece, index) => {
  piece.coords = [6, index]
  return piece
})

export const defaultBoard: ChessBoard = [
  bStrongs.flat(),
  bPawns.flat(),
  [Array(8).fill(null)].flat(),
  [Array(8).fill(null)].flat(),
  [Array(8).fill(null)].flat(),
  [Array(8).fill(null)].flat(),
  wPawns.flat(),
  wStrongs.flat(),
];

export const defaultSquare: Piece = {
  name: null,
  color: null,
  coords: [9, 9],
  moveSet: null,
  isMoved: false,
  defeatedAtTime: 0
}

export const createMoveSet = (piece: Piece, tablero: ChessBoard, lastPieceMoved: Piece) => {
  const { name: pieceName, color: pieceColor, coords } = piece
  if (pieceName === null || pieceColor === null) return null
  switch (pieceName) {
    case "bR":
    case "wR":
      return createRookMoveSet(piece, tablero)
    case "bN":
    case "wN":
      return createKnightMoveSet(piece, tablero)
    case "bB":
    case "wB":
      return createBishopMoveSet(piece, tablero)
    case "bQ":
    case "wQ":
      return createQueenMoveSet(piece, tablero)
    case "bK":
    case "wK":
      return createKingMoveSet(piece, tablero)
    case "bP":
    case "wP":
      return createPawnMoveSet(piece, tablero, lastPieceMoved)
    default:
      return null
  }
}

function createKnightMoveSet(piece: Piece, tablero: ChessBoard): number[][] {
  const [y, x] = piece.coords;
  const moveSet: number[][] = [];

  const knightMoves = [
    { dx: 2, dy: 1 },
    { dx: 1, dy: 2 },
    { dx: -1, dy: 2 },
    { dx: -2, dy: 1 },
    { dx: -2, dy: -1 },
    { dx: -1, dy: -2 },
    { dx: 1, dy: -2 },
    { dx: 2, dy: -1 },
  ];

  for (const move of knightMoves) {
    const newX = x + move.dx;
    const newY = y + move.dy;

    if (newX < 0 || newX >= 8 || newY < 0 || newY >= 8) continue; // Fuera de los límites del tablero
    const isPiece = tablero[newX][newY] !== null;
    if (isValidMove([newX, newY], tablero, piece.color, isPiece)) {
      moveSet.push([newX, newY]);
    }
  }

  return moveSet;
}


function createPawnMoveSet(piece: Piece, tablero: ChessBoard, lastPieceMoved: any): number[][] {
  const { color, coords } = piece;
  const [y, x] = coords;
  const moveSet: number[][] = [];

  const direction = color === 'BLANCAS' ? -1 : 1;

  // Movimiento hacia adelante una casilla
  const forwardOne = [x + direction, y];
  if (isValidMove(forwardOne, tablero, color, false)) {
    moveSet.push(forwardOne);
  }

  // Movimiento hacia adelante dos casillas en la primera jugada
  const forwardTwo = [x + 2 * direction, y];
  if (!tablero[x][y]!.isMoved && isValidMove(forwardTwo, tablero, color, false)) {
    moveSet.push(forwardTwo);
  }

  // Captura en diagonal izquierda
  const captureLeft = [x + direction, y - 1];
  if (isValidMove(captureLeft, tablero, color, true)) {
    moveSet.push(captureLeft);
  }

  // Captura en diagonal derecha
  const captureRight = [x + direction, y + 1];
  if (isValidMove(captureRight, tablero, color, true)) {
    moveSet.push(captureRight);
  }

  // Captura al paso
  const lastPieceMovedCoords = lastPieceMoved?.coords;
  console.log({ lastPieceMovedCoords, x, y, distance: lastPieceMoved?.distance});
  if (
    lastPieceMoved &&
    lastPieceMoved!.name!.includes('P') &&
    lastPieceMoved.distance[1] === 2 &&
    lastPieceMovedCoords[0] === y - 1 // La última pieza movida está a la izquierda
  ) {
    const enPassantCaptureLeft = [x + direction, y - 1];
    moveSet.push(enPassantCaptureLeft);
  }

  if (
    lastPieceMoved &&
    lastPieceMoved!.name!.includes('P') &&
    lastPieceMoved.distance[1] === 2 &&
    lastPieceMovedCoords[0] === y + 1 // La última pieza movida está a la derecha
  ) {
    const enPassantCaptureRight = [x + direction, y + 1];
    moveSet.push(enPassantCaptureRight);
  }


  return moveSet;
}

function createRookMoveSet(piece: Piece, tablero: ChessBoard): number[][] {
  const [x, y] = piece.coords;
  const moveSet: number[][] = [];
  // Movimientos horizontales hacia la derecha
  for (let i = x + 1; i < 8; i++) {
    const isPiece = tablero[y][i] !== null;
    if (!isValidMove([y, i], tablero, piece.color, isPiece)) break;
    moveSet.push([y, i]);
    if (isPiece) break;
  }
  // Movimientos horizontales hacia la izquierda
  for (let i = x - 1; i >= 0; i--) {
    const isPiece = tablero[y][i] !== null;
    if (!isValidMove([y, i], tablero, piece.color, isPiece)) break;
    moveSet.push([y, i]);
    if (isPiece) break;
  }
  // Movimientos verticales hacia abajo
  for (let j = y + 1; j < 8; j++) {
    const isPiece = tablero[j][x] !== null;
    if (!isValidMove([j, x], tablero, piece.color, isPiece)) break;
    moveSet.push([j, x]);
    if (isPiece) break;
  }
  // Movimientos verticales hacia arriba
  for (let j = y - 1; j >= 0; j--) {
    const isPiece = tablero[j][x] !== null;
    if (!isValidMove([j, x], tablero, piece.color, isPiece)) break;
    moveSet.push([j, x]);
    if (isPiece) break;
  }
  return moveSet;
}

function createBishopMoveSet(piece: Piece, tablero: ChessBoard): number[][] {
  const [x, y] = piece.coords;
  const moveSet: number[][] = [];
  // Movimientos en diagonal hacia arriba y a la derecha
  for (let i = 1; x + i < 8 && y + i < 8; i++) {
    const isPiece = tablero[y + i][x + i] !== null;
    if (!isValidMove([y + i, x + i], tablero, piece.color, isPiece)) break;
    moveSet.push([y + i, x + i]);
    if (isPiece) break;
  }
  // Movimientos en diagonal hacia arriba y a la izquierda
  for (let i = 1; x + i < 8 && y - i >= 0; i++) {
    const isPiece = tablero[y - i][x + i] !== null;
    if (!isValidMove([y - i, x + i], tablero, piece.color, isPiece)) break;
    moveSet.push([y - i, x + i]);
    if (isPiece) break;
  }
  // Movimientos en diagonal hacia abajo y a la derecha
  for (let i = 1; x - i >= 0 && y + i < 8; i++) {
    const isPiece = tablero[y + i][x - i] !== null;
    if (!isValidMove([y + i, x - i], tablero, piece.color, isPiece)) break;
    moveSet.push([y + i, x - i]);
    if (isPiece) break;
  }
  // Movimientos en diagonal hacia abajo y a la izquierda
  for (let i = 1; x - i >= 0 && y - i >= 0; i++) {
    const isPiece = tablero[y - i][x - i] !== null;
    if (!isValidMove([y - i, x - i], tablero, piece.color, isPiece)) break;
    moveSet.push([y - i, x - i]);
    if (isPiece) break;
  }
  return moveSet;
}

function createQueenMoveSet(piece: Piece, tablero: ChessBoard): number[][] {
  return createRookMoveSet(piece, tablero).concat(createBishopMoveSet(piece, tablero));
}

function createKingMoveSet(piece: Piece, tablero: ChessBoard): number[][] {
  const [y, x] = piece.coords;
  const moveSet: number[][] = [];
  // Movimientos horizontales y verticales
  const directions = [-1, 0, 1];
  for (const dx of directions) {
    for (const dy of directions) {
      if (dx === 0 && dy === 0) continue; // No es un movimiento válido (la posición actual)

      const newX = x + dx;
      const newY = y + dy;
      if (newX < 0 || newX >= 8 || newY < 0 || newY >= 8) continue; // Fuera de los límites del tablero
      const isPiece = tablero[newX][newY] !== null;

      if (isValidMove([newX, newY], tablero, piece.color, isPiece)) {
        moveSet.push([newX, newY]);
      }
    }
  }

  return moveSet;
}

function isValidMove(coords: number[], tablero: ChessBoard, pieceColor: PLAYERS | null, allowCapture: boolean): boolean {
  const [x, y] = coords;

  if (x < 0 || x >= 8 || y < 0 || y >= 8) {
    return false; // Fuera de los límites del tablero
  }

  const targetPiece = tablero[x][y];

  if (targetPiece === null) {
    return !allowCapture; // Movimiento válido si no hay una pieza en la casilla de destino (solo si no se permite la captura)
  }

  if (targetPiece.color !== pieceColor && allowCapture) {
    return true; // Movimiento válido si no hay una pieza del mismo color o si se permite la captura
  }

  return false; // Movimiento no válido si hay una pieza en la casilla de destino del mismo color o si no se permite la captura
}


// Función para detectar jaque
const detectarJaque = (tablero: ChessBoard, jugador: PLAYERS) => {
  // Encuentra la posición del rey del jugador actual
  const reyPosicion = encontrarRey(tablero, jugador);

  // Verifica si alguna pieza del oponente amenaza al rey
  for (let fila = 0; fila < tablero.length; fila++) {
    for (let columna = 0; columna < tablero[fila].length; columna++) {
      const pieza = tablero[fila][columna];
      if (pieza && pieza.color !== jugador) {
        if (pieza.moveSet.some(movimiento => movimiento[0] === reyPosicion[0] && movimiento[1] === reyPosicion[1])) {
          return true; // El rey está en jaque
        }
      }
    }
  }

  return false; // El rey no está en jaque
};


// Función para detectar jaque mate
const detectarJaqueMate = (tablero: ChessBoard, jugador: PLAYERS) => {
  // Si el rey no está en jaque, no hay jaque mate
  if (!detectarJaque(tablero, jugador)) {
    return false;
  }

  // Verifica si el rey puede escapar a algún lugar seguro
  const reyPosicion = encontrarRey(tablero, jugador);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const nuevaFila = reyPosicion[0] + i;
      const nuevaColumna = reyPosicion[1] + j;

      // Verifica si la nueva posición es válida y no está amenazada
      if (nuevaFila >= 0 && nuevaFila < tablero.length && nuevaColumna >= 0 && nuevaColumna < tablero[0].length) {
        if (!detectarJaque(tablero, jugador) && tablero[nuevaFila][nuevaColumna] === null) {
          return false; // El rey puede escapar
        }
      }
    }
  }

  // Si el rey no puede escapar, está en jaque mate
  return true;
};

// Función para encontrar la posición del rey de un jugador
const encontrarRey = (tablero: ChessBoard, jugador: PLAYERS) => {
  for (let fila = 0; fila < tablero.length; fila++) {
    for (let columna = 0; columna < tablero[fila].length; columna++) {
      const pieza: Piece = tablero[fila][columna];
      if (pieza && pieza.name?.includes('K') && pieza.color === jugador) {
        return [fila, columna];
      }
    }
  }

  // En caso de no encontrar el rey, devolvemos una posición no válida (-1, -1)
  return [-1, -1];
};