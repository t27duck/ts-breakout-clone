import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Collision";

// Images
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";

// Level and colors
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
} from "./setup";

// Helpers
import { createBricks } from "./helpers";

let gameOver = false;
let score = 0;
let lives = 3;
let bricks: Brick[];

function setGameOver(view: CanvasView) {
  view.drawInfo("Game Over!");
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("You Win!");
  gameOver = false;
}

function gameLoop(
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  // Move ball
  ball.moveBall();

  // Move paddle and check to prevent exiting the canvas
  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x < view.canvas.width - PADDLE_WIDTH)
  ) {
    paddle.movePaddle();
  }

  collision.checkBallPaddleAndWallCollision(ball, paddle, view);
  const collidingBrick = collision.isCollidingBricks(ball, bricks);

  if (collidingBrick) {
    score++;
    view.drawScore(score);

    ball.tickSpeed();
  }

  // Game over when ball leaves playfield
  if (ball.pos.y > view.canvas.height) {
    lives--;
    view.drawLives(`Lives: ${lives}`);
    if (lives === 0) {
      gameOver = true;
    } else {
      view.drawInfo("Launch ball...");
      return;
    }
  }

  if (bricks.length === 0) {
    return setGameWin(view);
  }

  // Return if game is over and break loop
  if (gameOver) {
    return setGameOver(view);
  }

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision))
}

function startGame(view: CanvasView) {
  // Reset game
  if (lives === 3 || lives === 0) {
    lives = 3;
    score = 0;
    view.drawScore(score);

    // Create all bricks
    bricks = createBricks();
  }

  view.drawLives(`Lives: ${lives}`);
  view.drawInfo("");

  // Create collision instance
  const collision = new Collision();

  // Create ball
  const ball = new Ball(
    BALL_SPEED,
    BALL_SIZE,
    { x: BALL_STARTX, y: BALL_STARTY },
    BALL_IMAGE
  );

  // Create paddle
  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 2, // Arbitrary bottom padding
    },
    PADDLE_IMAGE
  );

  gameLoop(view, bricks, paddle, ball, collision);
}

// Create a new view
const view = new CanvasView("#playField");
view.initStartButton(startGame);
