import {
    Component,
    ElementRef,
    Input,

    OnInit,
    ViewChild
} from "@angular/core";

@Component({
    selector: "app-node",
    templateUrl: "./node.component.html",
    styleUrls: ["./node.component.scss"],
})
export class NodeComponent implements OnInit {
    @Input() public node: any;

    @ViewChild("nodeElement")
    public nodeElement: ElementRef<HTMLDivElement>;

    constructor() {}

    ngOnInit(): void {}

    public focus() {
        this.nodeElement.nativeElement.focus();
    }
}
