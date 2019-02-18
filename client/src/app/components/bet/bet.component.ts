import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { AuthCookieService } from "src/app/services/auth-cookie.service";
import { User } from "src/app/server-interfaces/account";

@Component({
  selector: "app-bet",
  templateUrl: "./bet.component.html",
  styleUrls: ["./bet.component.scss"]
})
export class BetComponent implements OnInit {

  private account: User;

  public get Firstname(): string {
    return this.account ? this.account.firstName : "";
  }

  public get Lastname(): string {
    return this.account ? this.account.lastName : "";
  }

  public get Saldo(): number {
    return this.account ? this.account.saldo : 0;
  }

  constructor(private dataService: DataService, private authService: AuthCookieService) { }

  async ngOnInit() {
    this.account = await this.dataService.getAccountInformation(this.authService.getAuthKey());
  }

}
