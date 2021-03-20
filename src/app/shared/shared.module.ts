import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { PlaySoundDirective } from './directives/play-sound.directive';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, PlaySoundDirective],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, PlaySoundDirective]
})
export class SharedModule {}
