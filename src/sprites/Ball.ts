import { Vector } from '../types';
import { Paddle } from './Paddle';

export class Ball {
  private speed: Vector;
  private ballImage: HTMLImageElement = new Image();

  constructor(
    speed: number,
    private ballSize: number,
    private position: Vector,
    image: string
  ) {
    this.speed = { x: speed, y: -speed };
    this.ballSize = ballSize;
    this.position = position;
    this.ballImage.src = image;
  }

  // Getters
  get width(): number {
    return this.ballSize;
  }

  get height(): number {
    return this.ballSize;
  }

  get pos(): Vector {
    return this.position;
  }

  get image(): HTMLImageElement {
    return this.ballImage;
  }

  // Methods
  changeYDirection(): void {
    this.speed.y = -this.speed.y;
  }

  changeXDirection(): void {
    this.speed.x = -this.speed.x;
  }

  moveBall(): void {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }

  forceUp(): void {
    if (this.speed.y > 0) {
      this.speed.y = -this.speed.y;
    }
  }

  tickSpeed(): void {
    const currentXSpeed = this.speed.x;
    const currentYSpeed = this.speed.y
    const xDirection = this.speed.x > 0 ? "right" : "left"
    const yDirection = this.speed.y > 0 ? "down" : "up"

    if (xDirection === "right") {
      this.speed.x = currentXSpeed + (0.1 * (1 - currentXSpeed / 12));
    } else {
      this.speed.x = currentXSpeed - (0.1 * (1 - currentXSpeed / 12));
    }

    if (yDirection === "down") {
      this.speed.y = currentYSpeed + (0.1 * (1 - currentYSpeed / 12));
    } else {
      this.speed.y = currentYSpeed - (0.1 * (1 - currentYSpeed / 12));
    }
  }

  tickXSpeedFromPaddle(paddle: Paddle): void {
    const currentXSpeed = this.speed.x;
    const xDirection = this.speed.x > 0 ? "right" : "left"

    if (paddle.isMovingLeft) {
      if (xDirection === "right") {
        this.speed.x = currentXSpeed * 0.6;
      } else {
        this.speed.x = currentXSpeed * 1.2;
      }
    }

    if (paddle.isMovingRight) {
      if (xDirection === "right") {
        this.speed.x = currentXSpeed * 1.2;
      } else {
        this.speed.x = currentXSpeed * 0.6;
      }
    }
  }
}
