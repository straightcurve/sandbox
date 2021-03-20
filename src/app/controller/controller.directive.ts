import { Directive, HostListener, OnDestroy } from "@angular/core";
import { GameControllerService } from "./game-controller.service";
import Xbox360Controller from "./schemes/360";

@Directive({
    selector: "[appController]",
})
export class ControllerDirective implements OnDestroy {
    private ctrl: Xbox360Controller | null = null;
    private intervalHandle: NodeJS.Timeout;

    constructor(private controller: GameControllerService) {
        const freq = 1000 / 60;

        this.intervalHandle = setInterval(() => {
            if (!this.ctrl) return;

            this.ctrl.update();

            controller.input.next(this.ctrl);

            this.ctrl.post_update();
        }, freq);
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalHandle);
    }

    @HostListener("window:gamepadconnected", ["$event"])
    public onGamepadConnected(e: GamepadEvent) {
        console.log(e.gamepad);

        this.ctrl = new Xbox360Controller(e.gamepad);
    }

    @HostListener("window:gamepaddisconnected", ["$event"])
    public onGamepadDisconnected(e: GamepadEvent) {
        console.log(e.gamepad);

        this.ctrl = null;
    }
}
