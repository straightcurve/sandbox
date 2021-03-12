import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreeJsComponent } from "./three-js.component";

const routes: Routes = [
    {
        path: "three-js",
        component: ThreeJsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThreeJsRoutingModule {}
