import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { AuthCookieService } from "src/app/services/auth-cookie.service";
import { User } from "src/app/server-interfaces/user";
import { Transaction, BetTarget } from "src/app/server-interfaces/transaction";
import { Router } from "@angular/router";
import { SelectedBetTargetService } from "src/app/services/selected-bet-target.service";

@Component({
  selector: "app-bet",
  templateUrl: "./bet.component.html",
  styleUrls: ["./bet.component.scss"]
})
export class BetComponent implements OnInit {

  private readonly transaction: Transaction = {
    betMoney: 0,
    betTarget: null,
    user: null,
   };

  private get Account(): User {
    return this.transaction.user;
  }

  public betTarget = BetTarget;

  public get Firstname(): string {
    return this.Account ? this.Account.firstName : "";
  }

  public get Lastname(): string {
    return this.Account ? this.Account.lastName : "";
  }

  public get Saldo(): number {
    return this.Account ? this.Account.saldo : 0;
  }

  public set betMoney(inputString: string) {
    const money = Number(inputString);
    this.transaction.betMoney = money;
  }

  public set target(target: BetTarget) {
    this.transaction.betTarget = target;
  }

  public get currentTarget(): BetTarget {
    return this.transaction.betTarget;
  }

  public get canSendTransaction(): boolean {
    if (this.transaction.betMoney && this.transaction.betTarget != null && this.transaction.user) {
      if (!isNaN(this.transaction.betMoney) && this.transaction.betMoney <= this.Account.saldo && this.transaction.betMoney > 0) {
        return true;
      }
    }
    return false;
  }

  constructor(private dataService: DataService,
              private authService: AuthCookieService,
              private router: Router,
              private selectedBetTarget: SelectedBetTargetService) { }

  async ngOnInit() {
    this.transaction.user = await this.dataService.getAccountInformation(this.authService.getAuthKey());
  }

  public bookTransaction(): void {
    if (this.canSendTransaction) {
      const successful = this.dataService.bookTransaction(this.transaction);
      if (successful) {
        this.selectedBetTarget.selectedTarget = this.transaction.betTarget;
        this.router.navigate(["/wait"]);
      } else {
        console.error("Error booking transaction:", this.transaction);
      }
    }
  }
}
