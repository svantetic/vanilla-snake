
export class Block {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  constructor(x: number, y: number, width: number, height: number, color: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}