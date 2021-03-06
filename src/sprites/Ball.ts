import { Vector } from '../types';
import { Paddle } from './Paddle';
import { coinFlip } from '../helpers';

export class Ball {
  private speed: Vector;
  private ballImage: HTMLImageElement = new Image();
  collided: boolean = false;

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
    this.spinStartSpeed();
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
  spinStartSpeed(): void {
    if (coinFlip()) {
      this.changeXDirection();
    }

    this.speed.x += ((Math.random() * 1.25) * (coinFlip() ? 1 : -1));
  }

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

  forceLeft(): void {
    if (this.speed.x > 0) {
      this.speed.x = -this.speed.x;
    }
  }

  forceRight(): void {
    if (this.speed.x < 0) {
      this.speed.x = -this.speed.x;
    }
  }

  tickSpeed(): void {
    const currentXSpeed = this.speed.x;
    const currentYSpeed = this.speed.y
    const xDirection = this.speed.x > 0 ? "right" : "left"
    const yDirection = this.speed.y > 0 ? "down" : "up"
    const xSpeedAdjustment = (0.1 * (1 - currentXSpeed / 12));
    const ySpeedAdjustment = (0.1 * (1 - currentYSpeed / 12));

    if (xDirection === "right") {
      this.speed.x = currentXSpeed + xSpeedAdjustment;
    } else {
      this.speed.x = currentXSpeed - xSpeedAdjustment;
    }

    if (yDirection === "down") {
      this.speed.y = currentYSpeed + ySpeedAdjustment;
    } else {
      this.speed.y = currentYSpeed - ySpeedAdjustment;
    }
  }

  tickXSpeedFromPaddle(paddle: Paddle): void {
    const currentXSpeed = this.speed.x;
    const xDirection = this.speed.x > 0 ? "right" : "left"
    const speedDown = 0.6;
    const speedUp = 1.08;

    if (paddle.isMovingLeft) {
      if (xDirection === "right") {
        this.speed.x = currentXSpeed * speedDown;
      } else {
        this.speed.x = currentXSpeed * speedUp;
      }
    }

    if (paddle.isMovingRight) {
      if (xDirection === "right") {
        this.speed.x = currentXSpeed * speedUp;
      } else {
        this.speed.x = currentXSpeed * speedDown;
      }
    }
  }
}
