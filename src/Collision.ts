// Types
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Ball } from "./sprites/Ball";
import { CanvasView } from "./view/CanvasView";

export class Collision {

  isCollidingBrick(ball: Ball, brick: Brick): boolean {
    if (
      !ball.collided &&
      ball.pos.x < brick.pos.x + brick.width &&
      ball.pos.x + ball.width > brick.pos.x &&
      ball.pos.y < brick.pos.y + brick.height &&
      ball.pos.y + ball.height > brick.pos.y
    ) {
      return true
    }

    return false
  }

  isCollidingSide(ball: Ball, brick: Brick | Paddle): boolean {
    const dx = (ball.pos.x + ball.width / 2) - (brick.pos.x + brick.width / 2);
    const dy = (ball.pos.y + ball.height / 2) - (brick.pos.y + brick.height / 2);
    const width = (ball.width + brick.width) / 2;
    const height = (ball.height + brick.height) / 2;
    const crossWidth = width * dy;
    const crossHeight = height * dx;

    if (crossWidth > crossHeight) {
        return (crossWidth > -crossHeight) ? false : true; // bottom : left
    } else {
        return (crossWidth > -crossHeight) ? true : false; // right : top
    }
  }

  isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
    let colliding  = false

    bricks.forEach((brick, index) => {
      if (this.isCollidingBrick(ball, brick)) {
        ball.collided = true;

        if (this.isCollidingSide(ball, brick)) {
          ball.changeXDirection();
        } else { // Colliding top or bottom
          ball.changeYDirection();
        }

        if (brick.energy === 1) {
          bricks.splice(index, 1);
        } else {
          brick.energy--;
        }

        colliding = true
      }
    })

    ball.collided = false;

    return colliding;
  }

  checkBallPaddleAndWallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
    // 1. Check ball collision with paddle
    if (
      ball.pos.x + ball.width > paddle.pos.x &&
      ball.pos.x < paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height >= paddle.pos.y
    ) {
      ball.tickXSpeedFromPaddle(paddle);
      ball.forceUp();
    }

    // 2. Check ball collision with walls
    // Ball x movement constraints
    if (ball.pos.x > view.canvas.width - ball.width) {
      ball.forceLeft();
    }
    if (ball.pos.x < 0) {
      ball.forceRight();
    }
    // Ball y movement constraints
    if (ball.pos.y < 0) {
      ball.changeYDirection();
    }
  }
}
