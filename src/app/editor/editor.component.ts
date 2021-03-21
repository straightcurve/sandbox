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
import wrap from "../shared/utils/wrap";
import { NodeComponent } from "./tree/node/node.component";
import TreeNode from "./tree/node/tree-node";
import Tree from "./tree/tree";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
    public tree: Tree<string>;
    public current: number = -1;

    public get flattened() {
        return this.tree.flat.map((n, i) => ({
            name: `${n.data} at depth ${n.depth} || ${i}`,
            focused: n.focused,
        }));
    }

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
                if (this.current === -1) return this.onMoved(-1);

                this.tree.flat[this.current].collapsed = !this.tree.flat[
                    this.current
                ].collapsed;
            });
    }

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    ngOnInit(): void {
        this.tree = new Tree(
            new TreeNode({
                children: [1, 2].map(
                    (n) =>
                        new TreeNode({
                            data: `Action ${n}`,
                            children: [1, 2].map(
                                (n) =>
                                    new TreeNode({
                                        data: `Action ${n}`,
                                        children: [1, 2].map(
                                            (n) =>
                                                new TreeNode({
                                                    data: `Action ${n}`,
                                                })
                                        ),
                                    })
                            ),
                            collapsed: Boolean(n & 1),
                        })
                ),
                collapsed: false,
            })
        );
    }

    private onMoved(y: number) {
        this.previousDirection = y;
        if (y === 0) return;
        let flattened = this.tree.flat;
        let _wrap = (value: number) => wrap(value, 0, flattened.length);

        if (this.current > -1) flattened[this.current].focused = false;

        if (y < 0) this.current = _wrap(++this.current);
        else if (y > 0) this.current = _wrap(--this.current);

        flattened[this.current].focused = true;
    }
}
