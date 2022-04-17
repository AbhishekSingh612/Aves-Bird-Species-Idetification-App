import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultComponentComponent } from './result-component/result-component.component';
import { UploadImageComponentComponent } from './upload-image-component/upload-image-component.component';
import { BirdDetailComponentComponent } from './bird-detail-component/bird-detail-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultComponentComponent,
    UploadImageComponentComponent,
    BirdDetailComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
