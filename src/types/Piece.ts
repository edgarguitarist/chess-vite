export enum PLAYERS {
    WHITE = "BLANCAS",
    BLACK = "NEGRAS",
};

export interface Piece {
    name: string | null;
    color: PLAYERS | null;
    coords: number[];
    moveSet: number[][];
    isMoved: boolean;
    isSelected?: boolean;
    defeatedAtTime: number;
}