import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { NavigatorService } from "../navigator/navigator.service";
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

    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(private navigatorService: NavigatorService) {
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
