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

    public getChild(index: number): Node {
        return this.childrenElements.get(index);
    }

    ngOnInit(): void {}

    public focus() {
        this.nodeElement.nativeElement.focus();
    }
}
