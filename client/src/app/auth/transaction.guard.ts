import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { DataService } from "../services/data.service";
import { AuthCookieService } from "../services/auth-cookie.service";

@Injectable({
  providedIn: "root"
})
export class TransactionGuard implements CanActivate {

  constructor(private router: Router, private authCookieService: AuthCookieService, private dataService: DataService) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.authCookieService.doesAuthKeyExists()) {
      const authKey = this.authCookieService.getAuthKey();
      const isTransactionPending = await this.dataService.isAlreadyAnTransactionPending(authKey);
      if (isTransactionPending) {
        this.router.navigate(["/wait"]);
        return false;
      }
    }
    return true;
  }
}
