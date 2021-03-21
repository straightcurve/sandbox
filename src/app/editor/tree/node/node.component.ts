import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import TreeNode from "./tree-node";

@Component({
    selector: "app-node",
    templateUrl: "./node.component.html",
    styleUrls: ["./node.component.scss"],
})
export class NodeComponent implements OnInit {
    @Input() public node: TreeNode<string>;

    @ViewChild("nodeElement")
    public nodeElement: ElementRef<HTMLDivElement>;

    constructor() {}

    public get focused(): boolean {
        return this.node.focused;
    }

    ngOnInit(): void {}

    public focus() {
        this.nodeElement.nativeElement.focus();
    }
}
