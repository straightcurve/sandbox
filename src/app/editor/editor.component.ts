import {
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
import wrap from "../shared/utils/wrap";
import Node from "./tree/node/node";
import { NodeComponent } from "./tree/node/node.component";
import findNodeAtDepth from "./tree/utils/find-node-at-depth";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit, OnDestroy, Node {
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

    @ViewChildren("nodes")
    public nodeElements: QueryList<NodeComponent>;
    private currentNodeIndex: number = 0;
    /**
     * 1 means up, -1 means down, 0 means no input
     */
    private previousDirection: number = 0;

    private indexStack: Array<number> = [];

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

                this.nodes[
                    this.indexStack[this.indexStack.length - 1]
                ].collapsed = !this.nodes[this.indexStack.length - 1].collapsed;

                if (this.nodes[this.indexStack.length - 1].collapsed) {
                    this.indexStack.pop();

                    let node = findNodeAtDepth(
                        this,
                        this.indexStack,
                        -1
                    ) as NodeComponent;

                    node.focus();
                } else {
                    this.indexStack.push(0);
                }
            });

        navigatorService.select$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.hasFocus = true;
                this.indexStack.push(0);
                this.nodeElements.first.focus();
            });
    }

    public get childNodes(): Node[] {
        return this.nodeElements.toArray();
    }

    public getChild(index: number): Node {
        return this.nodeElements.get(index);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    ngOnInit(): void {}

    private onMoved(y) {
        this.previousDirection = y;

        let node = findNodeAtDepth(
            this,
            this.indexStack,
            this.indexStack.length - 1
        ) as NodeComponent;
        let i = this.indexStack[this.indexStack.length - 1];

        if (node === undefined) debugger;
        if (y < 0)
            this.indexStack[this.indexStack.length - 1] = wrap(
                ++i,
                0,
                node.childrenElements.length
            );
        else if (y > 0)
            this.indexStack[this.indexStack.length - 1] = wrap(
                --i,
                0,
                node.childrenElements.length
            );
        else return;

        node.childrenElements.get(i).focus();
    }
}
