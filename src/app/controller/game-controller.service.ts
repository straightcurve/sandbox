import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class GameControllerService {
    input: Subject<Gamepad>;

    constructor() {
        this.input = new Subject<Gamepad>();
    }
}
export interface InputEvent {
    leftStick: { x: number; y: number };
    rightStick: { x: number; y: number };
}
