import { fromEvent, Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import * as THREE from "three";
import MainActionMap from "./input/action-maps/main";

export default class KeyboardMouse implements MainActionMap {
    public get move(): Observable<THREE.Vector2> {
        return this._move as Observable<THREE.Vector2>;
    }

    private _move: Subject<THREE.Vector2>;
    private move_direction: THREE.Vector2;

    constructor() {
        this._move = new Subject();
        this.move_direction = new THREE.Vector2();

        fromEvent(document, "keydown")
            .pipe(tap(console.log))
            .subscribe((e: KeyboardEvent) => this.onKeyDown(e));

        fromEvent(document, "keyup")
            .pipe(tap(console.log))
            .subscribe((e: KeyboardEvent) => this.onKeyUp(e));
    }

    private onKeyDown(e: KeyboardEvent) {
        console.log(e.code, e.key);

        switch (e.code) {
            case "KeyW":
                this.move_direction.y = 1;
                break;
            case "KeyS":
                this.move_direction.y = -1;
                break;
            case "KeyA":
                this.move_direction.x = -1;
                break;
            case "KeyD":
                this.move_direction.x = 1;
                break;
            default:
                break;
        }

        this._move.next(this.move_direction);
    }

    private onKeyUp(e: KeyboardEvent) {
        console.log(e.code, e.key);

        switch (e.code) {
            case "KeyW":
                this.move_direction.y = 0;
                break;
            case "KeyS":
                this.move_direction.y = 0;
                break;
            case "KeyA":
                this.move_direction.x = 0;
                break;
            case "KeyD":
                this.move_direction.x = 0;
                break;
            default:
                break;
        }

        this._move.next(this.move_direction);
    }
}
