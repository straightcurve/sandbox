import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TitleModule } from '../title/title.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule,TitleModule, HomeRoutingModule]
})
export class HomeModule {}
