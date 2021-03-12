import { Component, OnInit } from "@angular/core";
import Menu from "./menu";

@Component({
    selector: "navigator",
    templateUrl: "./navigator.component.html",
    styleUrls: ["./navigator.component.scss"],
})
export class NavigatorComponent implements OnInit {
    public menus: Menu[] = [];

    constructor() {
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
        ];
    }

    ngOnInit(): void {}
}
