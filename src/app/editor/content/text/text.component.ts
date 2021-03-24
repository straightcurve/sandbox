import { Component, Input } from "@angular/core";

@Component({
    selector: "content-text",
    templateUrl: "./text.component.html",
    styleUrls: ["./text.component.scss"],
})
export class TextComponent {
    @Input() public title: string;
    @Input() public content: string;

    constructor() {}
}
