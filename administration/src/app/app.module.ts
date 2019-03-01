import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { SetMoneyComponent } from "./set-money/set-money.component";
import { UserSelectorComponent } from "./user-selector/user-selector.component";
import { CreateUserComponent } from "./create-user/create-user.component";
import { SetTransactionComponent } from "./set-transaction/set-transaction.component";

@NgModule({
  declarations: [
    AppComponent,
    SetMoneyComponent,
    UserSelectorComponent,
    CreateUserComponent,
    SetTransactionComponent
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    SetMoneyComponent,
    CreateUserComponent,
    SetTransactionComponent
  ]
})
export class AppModule { }
