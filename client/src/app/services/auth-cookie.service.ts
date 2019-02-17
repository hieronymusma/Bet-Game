import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthCookieService {

  private readonly authCookie = "auth-key-pshuttle";

  constructor(private cookie: CookieService) { }

  public doesAuthKeyExists(): boolean {
    return this.cookie.check(this.authCookie);
  }

  public setNewAuthKey(authKey: string): void {
    this.cookie.set(this.authCookie, authKey);
  }

  public getAuthKey(): string {
    if (!this.doesAuthKeyExists) {
      throw new Error("Auth key cookie doesn't exist");
    }
    return this.cookie.get(this.authCookie);
  }
}
