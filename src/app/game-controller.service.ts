import { HostListener, Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class GameControllerService {
    constructor() {}

    @HostListener("window:gamepadconnected", ["$event"])
    onGamepadConnected(e: GamepadEvent) {
        console.log(e);
    }

    @HostListener("window:gamepaddisconnected", ["$event"])
    onGamepadDisconnected(e) {
        console.log(e);
    }
}
