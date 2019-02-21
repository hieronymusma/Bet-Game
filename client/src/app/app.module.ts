import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";

import { RouterModule, Routes } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { BetComponent } from "./components/bet/bet.component";
import { AuthGuard } from "./auth/auth.guard";
import { ErrrorNotificationComponent } from "./errror-notification/errror-notification.component";
import { AppErrorHandler } from "./error-handler";
import { LineWrapPipe } from "./pipes/line-wrap.pipe";
import { WaitComponent } from "./wait/wait.component";
import { TransactionGuard } from "./auth/transaction.guard";

const appRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/bet" },
  { path: "bet", component: BetComponent, canActivate: [AuthGuard, TransactionGuard] },
  { path: "login", component: LoginComponent },
  { path: "wait", component: WaitComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BetComponent,
    ErrrorNotificationComponent,
    LineWrapPipe,
    WaitComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgxSpinnerModule
  ],
  providers: [
    CookieService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
