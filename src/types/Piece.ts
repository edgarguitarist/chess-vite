export enum TURNS {
    WHITE = "BLANCAS",
    BLACK = "NEGRAS",
};

export interface Piece {
    name: string | null;
    color: TURNS | null;
    coords: number[];
    moveSet: any;
}