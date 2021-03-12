import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TitleModule } from '../title/title.module';
import { DiffMergeRoutingModule } from './diff-merge-routing.module';
import { DiffMergeComponent } from './diff-merge.component';


@NgModule({
  declarations: [DiffMergeComponent],
  imports: [
    CommonModule,
    SharedModule,
    TitleModule,
    DiffMergeRoutingModule
  ],
})
export class DiffMergeModule { }
