export default class Xbox360Controller {
    gamepad: Gamepad;
    axes: readonly any[];
    buttons: readonly any[];
    private is_held_down: boolean[];

    constructor(from: Gamepad) {
        this.gamepad = from;
        this.buttons = from.buttons;
        this.axes = from.axes;
        this.is_held_down = [];
    }

    public isRightBumperPressed() {
        if (this.is_held_down[5]) return false;

        return this.gamepad.buttons[5].pressed;
    }

    public isRightBumperDown() {
        return this.gamepad.buttons[5].pressed;
    }

    public isLeftBumperPressed() {
        if (this.is_held_down[4]) return false;

        return this.gamepad.buttons[4].pressed;
    }

    public update() {
        this.gamepad = navigator.getGamepads()[this.gamepad.index];
    }

    public post_update() {
        this.is_held_down[4] = this.gamepad.buttons[4].pressed;
        this.is_held_down[5] = this.gamepad.buttons[5].pressed;
    }

    private get_button_up(index: number) {
        return !this.gamepad.buttons[index].pressed;
    }
}
