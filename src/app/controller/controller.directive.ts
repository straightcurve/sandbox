import { Directive, HostListener } from "@angular/core";
import { GameControllerService } from "./game-controller.service";

@Directive({
    selector: "[appController]",
})
export class ControllerDirective {
    private _gamepad: Gamepad | null = null;

    constructor(
        private controller: GameControllerService
    ) {
        const freq = 1000 / 60;

        setInterval(() => {
            if (!this._gamepad) return;

            controller.input.next(navigator.getGamepads()[this._gamepad.index]);
        }, freq);
    }

    @HostListener("window:gamepadconnected", ["$event"])
    public onGamepadConnected(e: GamepadEvent) {
        console.log(e.gamepad);

        this._gamepad = e.gamepad;
    }

    @HostListener("window:gamepaddisconnected", ["$event"])
    public onGamepadDisconnected(e: GamepadEvent) {
        console.log(e.gamepad);

        this._gamepad = null;
    }
}
