import { Component, Input, OnInit } from "@angular/core";
import Tree from "./tree";

@Component({
    selector: "app-tree",
    templateUrl: "./tree.component.html",
    styleUrls: ["./tree.component.scss"],
})
export class TreeComponent implements OnInit {
    @Input() public tree: Tree<string>;

    constructor() {}

    ngOnInit(): void {}
}
