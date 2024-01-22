import { PLAYERS, Piece } from "../types/Piece"
import { ChessBoard } from "../types/Global"
//import el archivo audio

export const defaultAudio = new Audio("/chess-vite/uu.mp3")

const createDefaultPiece = (color, name): Piece => {
  return {
    name,
    color,
    coords: [9, 9],
    moveSet: [],
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
  piece.coords = [index, 0]
  return { ...piece }
})

const bPawns = Array(8).fill(bP).map((piece, index) => {
  piece.coords = [index, 1]
  return { ...piece }
})
const wStrongs = [wR, wN, wB, wQ, wK, wB, wN, wR].map((piece, index) => {
  piece.coords = [index, 7]
  return { ...piece }
})
const wPawns = Array(8).fill(wP).map((piece, index) => {
  piece.coords = [index, 6]
  return { ...piece }
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
  moveSet: [],
  isMoved: false,
  defeatedAtTime: 0
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
  if (!piece.isMoved && isValidMove(forwardTwo, tablero, color, false)) {
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
  if (!lastPieceMoved) return moveSet
  const { distance, name, coords: lastPieceMovedCoords } = lastPieceMoved
  if (!distance || distance.length < 2) return moveSet
  if (
    lastPieceMoved &&
    name!.includes('P') &&
    distance[1] === 2 &&
    lastPieceMovedCoords[0] === y - 1 && // La última pieza movida está a la izquierda
    lastPieceMovedCoords[1] === x
  ) {
    const enPassantCaptureLeft = [x + direction, y - 1];
    moveSet.push(enPassantCaptureLeft);
  }

  if (
    lastPieceMoved &&
    name!.includes('P') &&
    distance[1] === 2 &&
    lastPieceMovedCoords[0] === y + 1 && // La última pieza movida está a la derecha
    lastPieceMovedCoords[1] === x
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

const generateUnfilteredMoveSet = (piece: Piece, tablero: ChessBoard, lastPieceMoved: Piece | null): number[][] => {
  switch (piece.name) {
    case "bR":
    case "wR":
      return createRookMoveSet(piece, tablero);
    case "bN":
    case "wN":
      return createKnightMoveSet(piece, tablero);
    case "bB":
    case "wB":
      return createBishopMoveSet(piece, tablero);
    case "bQ":
    case "wQ":
      return createQueenMoveSet(piece, tablero);
    case "bK":
    case "wK":
      return createKingMoveSet(piece, tablero);
    case "bP":
    case "wP":
      return createPawnMoveSet(piece, tablero, lastPieceMoved);
    default:
      return [];
  }
};

const simulateMove = (tablero, piece: Piece, move: number[]): ChessBoard => {
  const [fromX, fromY] = piece.coords;
  const [toX, toY] = move;

  // Crear una copia profunda del tablero usando JSON.stringify y JSON.parse
  const newTablero = JSON.parse(JSON.stringify(tablero));

  // Asignar la pieza movida a la nueva posición
  newTablero[toX][toY] = newTablero[fromY][fromX];
  
  // Restablecer la casilla de origen con defaultSquare
  newTablero[fromY][fromX] = null;


  return newTablero;
};

export const createMoveSet = (piece: Piece, tablero, lastPieceMoved: Piece | null): number[][] => {
  const { name: pieceName, color: pieceColor } = piece;
  if (pieceName === null || pieceColor === null) return [];

  // No llamamos directamente a simulateMove aquí para evitar recursividad infinita
  const moveSet = generateUnfilteredMoveSet(piece, tablero, lastPieceMoved);
  
  // Filtrar movimientos para evitar jaque
  const filteredMoveSet = moveSet.filter((move) => {
    const newTablero = JSON.parse(JSON.stringify(tablero));
    const [toX, toY] = move;
    const simulatedTablero = simulateMove(newTablero, piece, move);

    // Asegúrate de que createMoveSet no se llame directamente aquí
    const newPiece = simulatedTablero[toX][toY];
    if (!newPiece) return false;    
    return !isInCheck(newPiece.color, simulatedTablero);
  });


  return filteredMoveSet;
};


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

export const isInCheck = (playerColor: PLAYERS | null, tablero: ChessBoard): boolean => {
  if (!playerColor) return false;
  const king = findKing(playerColor, tablero);
  if (!king) {
    return false; // No se encontró el rey
  }
  // Verificar si alguna pieza del oponente tiene al rey en su lista de movimientos posibles
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = tablero[row][col];
      if (piece && piece.color !== playerColor) {
        const moveSet = generateUnfilteredMoveSet(piece, tablero, null);
        if (moveSet.some(([y, x]) => x === king!.coords[0] && y === king!.coords[1])) {
          return true;
        }
      }
    }
  }
  return false;
};

// Función para encontrar la posición del rey de un jugador en el tablero
const findKing = (playerColor: PLAYERS, tablero: ChessBoard): Piece | null => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = tablero[row][col];
      if (piece && piece?.name?.includes(`K`) && piece.color === playerColor) {
        return {...piece, coords: [col, row]};
      }
    }
  }
  return null;
};

export const isCheckmate = (playerColor: PLAYERS | null, tablero: ChessBoard): boolean => {
  //revisar si todas las piezas del jugador no puedan realizar movimientos
  if (!playerColor) return false;
  const king = findKing(playerColor, tablero);
  if (!king) {
    return false; // No se encontró el rey
  }
  //recorrer el tablero y verificar que todas las piezas del jugador no puedan realizar movimientos
  //si es así, entonces es jaque mate
  let count = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {

      const piece = tablero[row][col];
      if (piece && piece.color === playerColor) {
        const moveSet = createMoveSet(piece, tablero, null);
        if (moveSet.length > 0) {
          count++;
        }
      }
    }
  }
  return count === 0;
};

