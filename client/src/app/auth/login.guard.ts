import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthCookieService } from "../services/auth-cookie.service";
import { DataService } from "../services/data.service";
import { AuthGuard } from "./auth.guard";

@Injectable({
    providedIn: "root"
  })
export class LoginGuard implements CanActivate {

    constructor(
        private authCookieService: AuthCookieService,
        private dataService: DataService,
        private router: Router) { }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (this.authCookieService.doesAuthKeyExists()) {
            const authKey = this.authCookieService.getAuthKey();
            const isValid = await this.dataService.isUserValid(authKey);
            if (isValid) {
                this.router.navigate(["/bet"]);
              return false;
            }
          }
          return true;
    }
}
