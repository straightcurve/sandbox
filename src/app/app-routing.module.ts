import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailRoutingModule } from "./detail/detail-routing.module";
import { DiffMergeRoutingModule } from "./diff-merge/diff-merge-routing.module";
import { EditorRoutingModule } from "./editor/editor-routing.module";
import { HomeRoutingModule } from "./home/home-routing.module";
import { PageNotFoundComponent } from "./shared/components";

const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
    },
    {
        path: "**",
        component: PageNotFoundComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
        HomeRoutingModule,
        DetailRoutingModule,
        EditorRoutingModule,
        DiffMergeRoutingModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
