import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { BetComponent } from "./bet/bet.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/bet" },
  { path: "bet", component: BetComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BetComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
