import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiffMergeComponent } from "./diff-merge.component";

const routes: Routes = [
    {
        path: "diff-merge",
        component: DiffMergeComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiffMergeRoutingModule { }
