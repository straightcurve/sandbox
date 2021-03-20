export default class Xbox360Controller {
    gamepad: Gamepad;

    public get axes(): readonly number[] {
        return this.gamepad.axes;
    }

    public get buttons(): readonly GamepadButton[] {
        return this.gamepad.buttons;
    }

    private was_held_down: boolean[];
    private keyCodes: number[];

    constructor(from: Gamepad) {
        this.gamepad = from;
        this.was_held_down = [];

        let keys = Object.values(Xbox360Button);
        this.keyCodes = keys.slice(0, keys.length / 2) as number[];
    }

    public update() {
        this.gamepad = navigator.getGamepads()[this.gamepad.index];
    }

    public post_update() {
        this.was_held_down = this.keyCodes.map((code) => {
            return this.gamepad.buttons[Xbox360Button[code]].pressed;
        });
    }

    /**
     * bottom-left: {
     *      x: -1,
     *      y: -1,
     * }
     * top-right: {
     *      x: 1,
     *      y: 1,
     * }
     */
    public getLeftAxis() {
        return {
            x: this.gamepad.axes[0],
            y: this.gamepad.axes[1] * -1,
        };
    }

    /**
     * bottom-left: {
     *      x: -1,
     *      y: -1,
     * }
     * top-right: {
     *      x: 1,
     *      y: 1,
     * }
     */
    public getRightAxis() {
        return {
            x: this.gamepad.axes[2],
            y: this.gamepad.axes[3] * -1,
        };
    }

    /**
     * is the button pressed down this frame?
     * @param button
     */
    public isButtonHeldDown(button: Xbox360Button) {
        return this.gamepad.buttons[button].pressed;
    }

    /**
     * has the button been tapped this frame?
     * @param button
     */
    public isButtonTapped(button: Xbox360Button) {
        if (this.was_held_down[button]) return false;
        return this.gamepad.buttons[button].pressed;
    }

    public isButtonReleased(button: Xbox360Button) {
        if (!this.was_held_down[button]) return false;
        return !this.gamepad.buttons[button].pressed;
    }
}

export enum Xbox360Button {
    A = 0,
    B = 1,
    X = 2,
    Y = 3,
    LeftBumper = 4,
    RightBumper = 5,
    LeftTrigger = 6,
    RightTrigger = 7,
    Back = 8,
    Start = 9,
    LeftStick = 10,
    RightStick = 11,
    DpadUp = 12,
    DpadDown = 13,
    DpadLeft = 14,
    DpadRight = 15,
    Xbox = 16,
}
