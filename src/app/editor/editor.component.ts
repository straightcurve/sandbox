import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren
} from "@angular/core";
import { combineLatest, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";
import { GameControllerService } from "../controller/game-controller.service";
import { Xbox360Button } from "../controller/schemes/360";
import { NavigatorService } from "../navigator/navigator.service";
import normalize from "../shared/utils/normalize";
import Node from "./tree/node/node";
import { NodeComponent } from "./tree/node/node.component";
import Tree from "./tree/tree";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
    public nodes: Array<any> = [1, 2, 3, 4, 5].map((n) => ({
        name: `Action ${n}`,
        nodes: [1, 2, 3, 4, 5].map((n) => ({
            name: `Action ${n}`,
            nodes: [1, 2, 3, 4, 5].map((n) => ({
                name: `Action ${n}`,
            })),
        })),
        collapsed: n & 1,
    }));

    public tree: Tree;

    @ViewChildren("nodes")
    public nodeElements: QueryList<NodeComponent>;

    /**
     * 1 means up, -1 means down, 0 means no input
     */
    private previousDirection: number = 0;

    private hasFocus: boolean = false;
    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        private navigatorService: NavigatorService,
        private controller: GameControllerService
    ) {
        let input$ = controller.input.pipe(takeUntil(this.ngUnsubscribe));

        combineLatest([
            input$.pipe(map((ctrl) => normalize(ctrl.getLeftAxis().y))),
            input$.pipe(map((ctrl) => normalize(ctrl.getDpad().y))),
        ])
            .pipe(
                map(([axisY, padY]) => {
                    if (axisY !== 0) return axisY;
                    return padY;
                }),
                filter(
                    (y) => Math.sign(y) !== Math.sign(this.previousDirection)
                )
            )
            .subscribe(this.onMoved.bind(this));

        input$
            .pipe(filter((ctrl) => ctrl.isButtonTapped(Xbox360Button.A)))
            .subscribe((ctrl) => {
                if (!this.hasFocus) return;

                this.tree.selected.collapsed = !this.tree.selected.collapsed;
            });

        navigatorService.select$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.hasFocus = true;
                this.tree.next();
                (this.tree.selected as NodeComponent).focus();
            });
    }

    ngAfterViewInit(): void {
        this.tree = new Tree(this.nodeElements.toArray());
    }

    public get childNodes(): Node[] {
        return this.nodeElements.toArray();
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    ngOnInit(): void {}

    private onMoved(y) {
        this.previousDirection = y;

        if (y < 0) this.tree.next();
        else if (y > 0) this.tree.previous();
        else return;

        (this.tree.selected as NodeComponent).focus();
    }
}
