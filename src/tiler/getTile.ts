const TILE_BASE_PATH = "./tile-assets/tiled";

export const getTilePath = (level: number, column: number, row: number) =>
  `${TILE_BASE_PATH}/${level}/${column}/${row}.jpg`;
