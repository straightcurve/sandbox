import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { NodeComponent } from './tree/node/node.component';

@NgModule({
  declarations: [EditorComponent, NodeComponent],
  imports: [CommonModule, SharedModule, EditorRoutingModule]
})
export class EditorModule { }
