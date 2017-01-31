import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import AppComponent from './app.component';
import AboutDialogComponent from '../about.dialog/about.dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  entryComponents: [AboutDialogComponent],
  declarations: [AppComponent, AboutDialogComponent],
  bootstrap: [AppComponent]
})
export default class AppModule {

}
