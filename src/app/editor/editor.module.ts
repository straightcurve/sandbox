import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { NodeComponent } from './tree/node/node.component';
import { TreeComponent } from './tree/tree.component';
import { ImageTextComponent } from './panels/image-text/image-text.component';

@NgModule({
  declarations: [EditorComponent, NodeComponent, TreeComponent, ImageTextComponent],
  imports: [CommonModule, SharedModule, EditorRoutingModule]
})
export class EditorModule { }
