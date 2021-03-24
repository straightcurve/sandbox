import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
// NG Translate
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ControllerDirective } from "./controller/controller.directive";
import { CoreModule } from "./core/core.module";
import { DetailModule } from "./detail/detail.module";
import { DiffMergeModule } from "./diff-merge/diff-merge.module";
import { EditorModule } from "./editor/editor.module";
import { HomeModule } from "./home/home.module";
import { NavigatorComponent } from "./navigator/navigator.component";
import { SharedModule } from "./shared/shared.module";
import { ThreeJsModule } from "./three-js/three-js.module";
import { TitleModule } from "./title/title.module";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [AppComponent, NavigatorComponent, ControllerDirective],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        TitleModule,
        HomeModule,
        DiffMergeModule,
        DetailModule,
        ThreeJsModule,
        EditorModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
