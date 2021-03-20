import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { SFX, SfxService } from "../services/sfx/sfx.service";

@Directive({
    selector: "[playSound]",
})
export class PlaySoundDirective {
    @Input() public focusSfx: SFX = SFX.move;
    @Input() public hoverSfx: SFX = SFX.move;

    constructor(private elem: ElementRef, private sfx: SfxService) {}

    @HostListener("focus")
    public onFocus() {
        this.sfx.play(this.focusSfx);
    }

    @HostListener("hover")
    public onHover() {
        this.sfx.play(this.hoverSfx);
    }
}
