import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { AuthCookieService } from "../../services/auth-cookie.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

  public firstName = "";
  public lastName = "";

  public get isValid(): boolean {
    if (this.firstName && this.lastName && this.firstName.length > 0 && this.lastName.length > 0) {
      return true;
    }
    return false;
  }

  constructor(
    private dataService: DataService,
    private authCookieService: AuthCookieService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  public async clickStart() {
    this.spinner.show();
    const guid = await this.dataService.createUserAndReturnGuid(this.firstName, this.lastName);
    this.spinner.hide();
    this.authCookieService.setNewAuthKey(guid);
    this.router.navigate(["/bet"]);
  }
}
