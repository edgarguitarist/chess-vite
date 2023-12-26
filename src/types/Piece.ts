export enum TURNS {
    WHITE = "BLANCO",
    BLACK = "NEGRO",
};

export interface Piece {
    name: string | null;
    color: TURNS | null;
    coords: number[];
    defeated: boolean;
    moveSet: any;
}