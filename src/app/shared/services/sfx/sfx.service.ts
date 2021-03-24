import { Injectable } from "@angular/core";

export enum SFX {
    move = "move",
}

@Injectable({
    providedIn: "root",
})
export class SfxService {
    //@ts-ignore
    private sfx: {
        (type: SFX): HTMLAudioElement;
    } = {};

    constructor() {
        this.sfx[SFX.move] = new Audio("assets/sound/ui-move.ogg");
    }

    public play(sound: "move" | SFX) {
        this.sfx[sound].currentTime = 0;
        this.sfx[sound].play();
    }
}
