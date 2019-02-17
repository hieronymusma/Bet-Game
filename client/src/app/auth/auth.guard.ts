import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { DataService } from "../services/data.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  private readonly authCookie = "auth-key-pshuttle";

  constructor(private router: Router, private cookieService: CookieService, private dataService: DataService) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const cookieAvailable = this.cookieService.check(this.authCookie);

    if (cookieAvailable) {
      const authKey = this.cookieService.get(this.authCookie);
      const isValid = await this.dataService.IsUserValid(authKey);

      if (isValid) {
        return true;
      }
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
