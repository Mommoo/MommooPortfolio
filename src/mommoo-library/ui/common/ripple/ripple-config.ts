import {Injectable} from '@angular/core';

@Injectable()
export class RippleConfig {
  private _container: HTMLElement;
  private _positionX: number;
  private _positionY: number;
  private _color: string;
  private _radius: string;
  private _fadeInDuration: number;
  private _fadeOutDuration: number;

  get container(): HTMLElement {
    return this._container;
  }

  set container(value: HTMLElement) {
    this._container = value;
  }

  get positionX(): number {
    return this._positionX;
  }

  set positionX(value: number) {
    this._positionX = value;
  }

  get positionY(): number {
    return this._positionY;
  }

  set positionY(value: number) {
    this._positionY = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get fadeInDuration(): number {
    return this._fadeInDuration;
  }

  set fadeInDuration(value: number) {
    this._fadeInDuration = value;
  }

  get fadeOutDuration(): number {
    return this._fadeOutDuration;
  }

  set fadeOutDuration(value: number) {
    this._fadeOutDuration = value;
  }


  get radius(): string {
    return this._radius;
  }

  set radius(value: string) {
    this._radius = value;
  }
}
