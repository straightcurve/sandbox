import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    ViewChild
} from "@angular/core";

@Component({
    selector: "content-image-text",
    templateUrl: "./image-text.component.html",
    styleUrls: ["./image-text.component.scss"],
})
export class ImageTextComponent implements AfterViewInit {
    @Input() public title: string;
    @Input() public content: string;
    @Input() public image: string;

    constructor() {}

    ngAfterViewInit(): void {
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
