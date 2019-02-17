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

const appRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/bet" },
  { path: "bet", component: BetComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BetComponent,
    ErrrorNotificationComponent,
    LineWrapPipe
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
