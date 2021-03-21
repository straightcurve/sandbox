import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { PageNotFoundComponent } from "./components/";
import { WebviewDirective } from "./directives/";
import { FocusDirective } from "./directives/focus/focus.directive";
import { PlaySoundDirective } from "./directives/play-sound.directive";

@NgModule({
    declarations: [
        PageNotFoundComponent,
        WebviewDirective,
        PlaySoundDirective,
        FocusDirective,
    ],
    imports: [CommonModule, TranslateModule, FormsModule],
    exports: [
        TranslateModule,
        WebviewDirective,
        FormsModule,
        PlaySoundDirective,
        FocusDirective,
    ],
})
export class SharedModule {}
