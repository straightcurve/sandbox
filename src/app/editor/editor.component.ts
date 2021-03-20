import {
    Component,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren,
} from "@angular/core";
import { interval, Subject } from "rxjs";
import {
    bufferCount,
    debounceTime,
    filter,
    switchMap,
    takeUntil,
    throttle,
    throttleTime,
} from "rxjs/operators";
import { GameControllerService } from "../controller/game-controller.service";
import { NavigatorService } from "../navigator/navigator.service";
import wrap from "../shared/utils/wrap";
import { NodeComponent } from "./tree/node/node.component";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit, OnDestroy {
    public nodes: Array<any> = [1, 2, 3, 4, 5].map((n) => ({
        name: `Action ${n}`,
        nodes: [1, 2, 3, 4, 5].map((n) => ({
            name: `Action ${n}`,
            nodes: [1, 2, 3, 4, 5].map((n) => ({
                name: `Action ${n}`,
            })),
        })),
    }));

    @ViewChildren("nodes")
    public nodeElements: QueryList<NodeComponent>;
    private currentNodeIndex: number = 0;
    private previousYInput: number = 0;

    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        private navigatorService: NavigatorService,
        private controller: GameControllerService
    ) {
        controller.input
            .pipe(
                takeUntil(this.ngUnsubscribe),
                filter((ctrl) => {
                    return (
                        Math.sign(ctrl.getLeftAxis().y) !==
                        Math.sign(this.previousYInput)
                    );
                })
            )
            .subscribe((ctrl) => {
                let { x, y } = ctrl.getLeftAxis();
                this.previousYInput = y;

                if (y < 0)
                    this.currentNodeIndex = wrap(
                        ++this.currentNodeIndex,
                        0,
                        this.nodes.length
                    );
                else if (y > 0)
                    this.currentNodeIndex = wrap(
                        --this.currentNodeIndex,
                        0,
                        this.nodes.length
                    );
                else return;

                this.nodeElements.get(this.currentNodeIndex).focus();
            });
        navigatorService.select$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.nodeElements.first.focus();
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    ngOnInit(): void {}
}
