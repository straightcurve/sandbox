import {
    AfterViewInit,
    Component,
    HostListener,
    ViewChild
} from "@angular/core";

@Component({
    selector: "app-three-js",
    templateUrl: "./three-js.component.html",
    styleUrls: ["./three-js.component.scss"],
})
export class ThreeJsComponent implements AfterViewInit {
    @ViewChild("container") container: { nativeElement: HTMLDivElement };
    @ViewChild("game") game: { nativeElement: HTMLIFrameElement };

    @HostListener("window:resize", ["$event"])
    onResize(event) {
        const aspect_ratio = 16 / 9;
        this.game.nativeElement.height = (
            this.container.nativeElement.clientWidth / aspect_ratio
        ).toString();
    }

    constructor() {}

    ngAfterViewInit(): void {
        const aspect_ratio = 16 / 9;
        this.game.nativeElement.height = (
            this.container.nativeElement.clientWidth / aspect_ratio
        ).toString();
        this.game.nativeElement.src = "http://localhost:7878/game.html";
    }
}
