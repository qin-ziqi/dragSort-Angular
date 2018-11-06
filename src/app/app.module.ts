import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DragSortComponent } from './drag-sort/drag-sort.component';
import { DragSortDirective } from './drag-sort/drag-sort.directive';

@NgModule({
  declarations: [
    AppComponent,
    DragSortComponent,
    DragSortDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
