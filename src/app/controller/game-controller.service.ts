import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import Xbox360Controller from "./schemes/360";

@Injectable({
    providedIn: "root",
})
export class GameControllerService {
    input: Subject<Xbox360Controller>;

    constructor() {
        this.input = new Subject<Xbox360Controller>();
    }
}
export interface InputEvent {
    leftStick: { x: number; y: number };
    rightStick: { x: number; y: number };
}
