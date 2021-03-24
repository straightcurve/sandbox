import { Component, Input } from "@angular/core";

@Component({
    selector: "content-image-text",
    templateUrl: "./image-text.component.html",
    styleUrls: ["./image-text.component.scss"],
})
export class ImageTextComponent {
    @Input() public title: string;
    @Input() public content: string;
    @Input() public image: string;

    constructor() {}
}
