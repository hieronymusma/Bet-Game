import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { SetMoneyComponent } from "./set-money/set-money.component";

@NgModule({
  declarations: [
    AppComponent,
    SetMoneyComponent
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    SetMoneyComponent
  ]
})
export class AppModule { }
