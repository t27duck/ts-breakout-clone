import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Collision";

// Helpers
import { createBricks } from "./helpers";

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

export class Game {
  private view: CanvasView;
  private lives: number = 3;
  private score: number = 0;
  private gameOver: boolean = false;
  private bricks: Brick[] = [];

  constructor(view: CanvasView) {
    this.view = view;
    this.view.initStartButton(this.startGame.bind(this));
  }

  setGameOver(view: CanvasView): void {
    this.view.drawInfo("Game Over!");
    this.gameOver = false;
  }

  setGameWin(view: CanvasView): void {
    this.view.drawInfo("You Win!");
    this.gameOver = false;
  }

  startGame(): void {
    // Reset game
    if (this.lives === 3 || this.lives === 0) {
      this.lives = 3;
      this.score = 0;
      this.view.drawScore(this.score);

      // Create all bricks
      this.bricks = createBricks();
    }

    this.view.drawLives(`Lives: ${this.lives}`);
    this.view.drawInfo("");

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
        y: this.view.canvas.height - PADDLE_HEIGHT - 2, // Arbitrary bottom padding
      },
      PADDLE_IMAGE
    );

    this.gameLoop(this.bricks, paddle, ball, collision);
  }

  gameLoop(
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball,
    collision: Collision
  ): void {
    this.view.clear();
    this.view.drawBricks(bricks);
    this.view.drawSprite(paddle);
    this.view.drawSprite(ball);

    // Move ball
    ball.moveBall();

    // Move paddle and check to prevent exiting the canvas
    if (
      (paddle.isMovingLeft && paddle.pos.x > 0) ||
      (paddle.isMovingRight && paddle.pos.x < this.view.canvas.width - PADDLE_WIDTH)
    ) {
      paddle.movePaddle();
    }

    collision.checkBallPaddleAndWallCollision(ball, paddle, this.view);
    const collidingBrick = collision.isCollidingBricks(ball, bricks);

    if (collidingBrick) {
      this.score++;
      this.view.drawScore(this.score);

      ball.tickSpeed();
    }

    // Game over when ball leaves playfield
    if (ball.pos.y > this.view.canvas.height) {
      this.lives--;
      this.view.drawLives(`Lives: ${this.lives}`);
      if (this.lives === 0) {
        this.gameOver = true;
      } else {
        this.view.drawInfo("Launch ball...");
        return;
      }
    }

    if (bricks.length === 0) {
      return this.setGameWin(this.view);
    }

    // Return if game is over and break loop
    if (this.gameOver) {
      return this.setGameOver(this.view);
    }

    requestAnimationFrame(() => this.gameLoop(bricks, paddle, ball, collision))
  }

}
