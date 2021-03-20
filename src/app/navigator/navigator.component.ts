import { Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Router } from "@angular/router";
import { GameControllerService } from "../controller/game-controller.service";
import { Xbox360Button } from "../controller/schemes/360";
import Menu from "./menu";

@Component({
    selector: "navigator",
    templateUrl: "./navigator.component.html",
    styleUrls: ["./navigator.component.scss"],
})
export class NavigatorComponent implements OnInit {
    public debug: string;
    public menus: Menu[] = [];
    private sfx: {
        ["move"]: HTMLAudioElement;
    } = {
        move: new Audio("assets/sound/ui-move.ogg"),
    };
    private activeMenuIndex: number = 0;

    @ViewChildren("menus")
    public menuElements: QueryList<ElementRef>;
    
    constructor(
        private router: Router,
        private controller: GameControllerService
    ) {
        this.menus = [
            {
                name: "Home",
                link: "/home",
            },
            {
                name: "Editor",
                link: "/editor",
            },
            {
                name: "Diff/Merge",
                link: "/diff-merge",
            },
            {
                name: "ThreeJS",
                link: "/three-js",
            },
        ];

        this.controller.input.subscribe({
            next: (event) => {
                if (event.isButtonPressed(Xbox360Button.RightBumper)) {
                    this.activeMenuIndex = this.wrap(++this.activeMenuIndex, 0, this.menus.length);
                    let arr = this.menuElements.toArray();
                    arr[this.activeMenuIndex].nativeElement.focus();
                }
                if (event.isButtonPressed(Xbox360Button.LeftBumper)) {
                    this.activeMenuIndex = this.wrap(--this.activeMenuIndex, 0, this.menus.length);
                    let arr = this.menuElements.toArray();
                    arr[this.activeMenuIndex].nativeElement.focus();
                }
                this.debug = event.axes.join("\n") + "\n" + event.buttons.map(b => b.value).join("\n");
            },
        });
    }

    private wrap(value: number, left: number, right: number) {
        return value < left ? (right + value % right) : value % right; 
    }

    ngOnInit(): void {}

    public onFocus(menu: Menu) {
        this.sfx.move.currentTime = 0;
        this.sfx.move.play();

        Promise.resolve().then(() => {
            this.router.navigateByUrl(menu.link);
        });
    }
}
