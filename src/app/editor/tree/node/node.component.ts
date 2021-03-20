import {
    Component,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from "@angular/core";
import Node from "./node";
@Component({
    selector: "app-node",
    templateUrl: "./node.component.html",
    styleUrls: ["./node.component.scss"],
})
export class NodeComponent implements OnInit, Node {
    @Input() public node: any;

    @ViewChild("nodeElement")
    public nodeElement: ElementRef<HTMLDivElement>;

    @ViewChildren("children")
    public childrenElements: QueryList<NodeComponent>;
    public get childNodes(): Node[] {
        return this.childrenElements.toArray();
    }

    constructor() {}

    public get collapsed(): boolean {
        return this.node.collapsed;
    }

    public set collapsed(value: boolean) {
        this.node.collapsed = value;
    }

    public canNavigateToChildNodes(): boolean {
        return !this.collapsed;
    }

    public getChild(index: number): Node {
        return this.childrenElements.get(index);
    }

    ngOnInit(): void {}

    public focus() {
        this.nodeElement.nativeElement.focus();
    }
}
