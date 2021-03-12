import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleModule } from '../title/title.module';
import { ThreeJsRoutingModule } from './three-js-routing.module';
import { ThreeJsComponent } from './three-js.component';



@NgModule({
  declarations: [ThreeJsComponent],
  imports: [
    CommonModule,
    TitleModule,
    ReactiveFormsModule,
    ThreeJsRoutingModule,
  ]
})
export class ThreeJsModule { }
