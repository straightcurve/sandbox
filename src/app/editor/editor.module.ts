import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { NodeComponent } from './tree/node/node.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  declarations: [EditorComponent, NodeComponent, TreeComponent],
  imports: [CommonModule, SharedModule, EditorRoutingModule]
})
export class EditorModule { }
