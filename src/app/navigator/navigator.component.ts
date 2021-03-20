import { Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Router } from "@angular/router";
import { GameControllerService } from "../controller/game-controller.service";
import { Xbox360Button } from "../controller/schemes/360";
import wrap from "../shared/utils/wrap";
import Menu from "./menu";
import { NavigatorService } from "./navigator.service";

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
    private isFocused: boolean = false;

    @ViewChildren("menus")
    public menuElements: QueryList<ElementRef<HTMLDivElement>>;
    
    constructor(
        private router: Router,
        private controller: GameControllerService,
        private navigatorService: NavigatorService
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
                if (event.isButtonTapped(Xbox360Button.RightBumper)) {
                    this.isFocused = true;
                    this.activeMenuIndex = wrap(++this.activeMenuIndex, 0, this.menus.length);
                    let arr = this.menuElements.toArray();
                    arr[this.activeMenuIndex].nativeElement.focus();
                }
                if (event.isButtonTapped(Xbox360Button.LeftBumper)) {
                    this.isFocused = true;
                    this.activeMenuIndex = wrap(--this.activeMenuIndex, 0, this.menus.length);
                    let arr = this.menuElements.toArray();
                    arr[this.activeMenuIndex].nativeElement.focus();
                }

                if (this.isFocused && event.isButtonTapped(Xbox360Button.A)) {
                    this.isFocused = false;
                    navigatorService.select$.next();
                }

                this.debug = event.axes.join("\n") + "\n" + event.buttons.map(b => b.value).join("\n");
            },
        });
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
