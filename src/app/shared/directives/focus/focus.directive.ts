import {
    Directive,
    ElementRef,

    OnChanges,
    SimpleChanges
} from "@angular/core";

@Directive({
    selector: "[focus]",
    inputs: ["focused"],
})
export class FocusDirective implements OnChanges {
    focused: boolean = false;

    constructor(private elem: ElementRef<HTMLElement>) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.focused) this.elem.nativeElement.focus();
    }
}
