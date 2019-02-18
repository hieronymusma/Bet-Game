import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { DataService } from "../services/data.service";
import { AuthCookieService } from "../services/auth-cookie.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authCookieService: AuthCookieService, private dataService: DataService) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.authCookieService.doesAuthKeyExists()) {
      const authKey = this.authCookieService.getAuthKey();
      const isValid = await this.dataService.isUserValid(authKey);
      if (isValid) {
        return true;
      }
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
