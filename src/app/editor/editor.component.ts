import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { NavigatorService } from "../navigator/navigator.service";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit, OnDestroy {
    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(private navigatorService: NavigatorService) {
        navigatorService.select$.pipe(
            takeUntil(this.ngUnsubscribe)
        )
        .subscribe(() => {
            console.log("select the first element");
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    ngOnInit(): void {}
}
