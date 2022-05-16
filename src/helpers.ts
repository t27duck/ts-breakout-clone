import { Brick } from "./sprites/Brick";
import {
  BRICK_IMAGES,
  LEVEL,
  STAGE_COLS,
  STAGE_PADDING,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_PADDING,
  BRICK_ENERGY,
} from "./setup";

export function createBricks(): Brick[] {
  return LEVEL.reduce((ackumulator, brickType, index) => {
    const row = Math.floor((index + 1) / STAGE_COLS);
    const col = index % STAGE_COLS;

    const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
    const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);

    if (brickType === 0) {
      return ackumulator;
    }

    return [
      ...ackumulator,
      new Brick(
        BRICK_WIDTH,
        BRICK_HEIGHT,
        { x, y },
        BRICK_ENERGY[brickType],
        BRICK_IMAGES[brickType]
      )
    ];
  }, [] as Brick[]);
}

export function coinFlip(): boolean {
  return Math.floor(Math.random() * 2) === 1;
}
