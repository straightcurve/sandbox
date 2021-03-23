import {
    AfterViewChecked,

    Component,
    ElementRef,
    Input,
    ViewChild
} from "@angular/core";

@Component({
    selector: "content-text",
    templateUrl: "./text.component.html",
    styleUrls: ["./text.component.scss"],
})
export class TextComponent implements AfterViewChecked {
    @Input() public title: string;
    @Input() public content: string;

    constructor() {}

    ngAfterViewChecked(): void {
        this.recalculateContainerSize();
    }

    @ViewChild("header")
    public headerElem: ElementRef<HTMLDivElement>;

    @ViewChild("container")
    public contentElem: ElementRef<HTMLDivElement>;

    private recalculateContainerSize() {
        let header_height = this.headerElem.nativeElement.clientHeight;
        this.contentElem.nativeElement.style.height = `calc(100% - ${header_height}px)`;
    }
}
