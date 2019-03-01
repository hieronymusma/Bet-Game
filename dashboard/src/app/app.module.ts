import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SortPipe } from "./sort.pipe";
import { StatisticsComponent } from "./statistics/statistics.component";
import { TableComponent } from "./table/table.component";

@NgModule({
  declarations: [
    AppComponent,
    SortPipe,
    StatisticsComponent,
    TableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
