import { Component, Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EmitterService {
  // tslint:disable-next-line:variable-name
  private static _emitters: { [channel: string]: EventEmitter<any> } = {};
  static get(channel: string): EventEmitter<any> {
    if (!this._emitters[channel]) {
      this._emitters[channel] = new EventEmitter();
    }
    return this._emitters[channel];
  }
}
