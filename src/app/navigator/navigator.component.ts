import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Menu from "./menu";

@Component({
    selector: "navigator",
    templateUrl: "./navigator.component.html",
    styleUrls: ["./navigator.component.scss"],
})
export class NavigatorComponent implements OnInit {
    public menus: Menu[] = [];
    private sfx: {
        ["move"]: HTMLAudioElement,
    } = {
        move: new Audio("assets/sound/ui-move.ogg"),
    };

    constructor(private router: Router) {
        this.menus = [
            {
                name: "Home",
                link: "/home"
            },
            {
                name: "Editor",
                link: "/editor"
            },
            {
                name: "Diff/Merge",
                link: "/diff-merge"
            },
            {
                name: "ThreeJS",
                link: "/three-js",
            },
        ];
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
