export class BaseCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(selector: string) {
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');
  }
}