import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeJsRoutingModule } from './three-js-routing.module';
import { ThreeJsComponent } from './three-js.component';


@NgModule({
  declarations: [ThreeJsComponent],
  imports: [
    CommonModule,
    ThreeJsRoutingModule
  ]
})
export class ThreeJsModule { }
