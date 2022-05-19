import RED_BRICK_IMAGE from './images/brick-red.png';
import BLUE_BRICK_IMAGE from './images/brick-blue.png';
import GREEN_BRICK_IMAGE from './images/brick-green.png';
import YELLOW_BRICK_IMAGE from './images/brick-yellow.png';
import PURPLE_BRICK_IMAGE from './images/brick-purple.png';
import ORANGE_BRICK_IMAGE from './images/brick-orange.png';
import GREENBLUE_BRICK_IMAGE from './images/brick-greenblue.png';
import PINK_BRICK_IMAGE from './images/brick-pink.png';

// Grab the canvas element for calculating the brick width
// depending on canvas width
const canvas: HTMLCanvasElement | null = document.querySelector('#playField');

// Constants
export const STAGE_PADDING = 10;
export const STAGE_ROWS = 20;
export const STAGE_COLS = 10;
export const BRICK_PADDING = 5;
export const BRICK_WIDTH = canvas
  ? Math.floor((canvas.width - STAGE_PADDING * 2) / STAGE_COLS) - BRICK_PADDING
  : 100;
export const BRICK_HEIGHT = canvas
  ? Math.floor((canvas.height - STAGE_PADDING * 2) / STAGE_ROWS) - BRICK_PADDING
  : 30;
export const PADDLE_WIDTH = 100;
export const PADDLE_HEIGHT = 10;
export const PADDLE_STARTX = 175;
export const PADDLE_SPEED = 10;
export const BALL_SPEED = 5;
export const BALL_SIZE = 15;
export const BALL_STARTX = 250;
export const BALL_STARTY = 400;

export const BRICK_IMAGES: { [key: number]: string } = {
  1: RED_BRICK_IMAGE,
  2: GREEN_BRICK_IMAGE,
  3: YELLOW_BRICK_IMAGE,
  4: BLUE_BRICK_IMAGE,
  5: PURPLE_BRICK_IMAGE,
  6: ORANGE_BRICK_IMAGE,
  7: GREENBLUE_BRICK_IMAGE,
  8: PINK_BRICK_IMAGE
};

export const BRICK_ENERGY: { [key: number]: number } = {
  1: 1, // Red brick
  2: 1, // Green brick
  3: 2, // Yellow brick
  4: 2, // Blue brick
  5: 3, // Purple brick
  6: 1, // Orange brick
  7: 2, // Green-blue brick
  8: 2, // Pink brick
};

// prettier-ignore
export const LEVEL = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 6, 1, 1, 1, 1, 1, 1, 6, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 3, 3, 3, 3, 3, 3, 3, 3, 0,
  0, 7, 4, 4, 4, 4, 4, 4, 7, 0,
  0, 8, 5, 5, 0, 0, 5, 5, 8, 0,
];
