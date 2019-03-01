import { Component } from "@angular/core";
import { DataService } from "./services/data.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BetTarget } from "./bet-target";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SetMoneyComponent } from "./set-money/set-money.component";
import { CreateUserComponent } from "./create-user/create-user.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  targets = BetTarget;

  constructor(
    private dataService: DataService,
    private spinnerService: NgxSpinnerService,
    private modalService: NgbModal) { }

  public async recreateDatabse() {
    this.spinnerService.show();
    await this.dataService.recreateDatabase();
    this.spinnerService.hide();
  }

  public async bookTransactions(target: BetTarget) {
    this.spinnerService.show();
    await this.dataService.bookTransactions(target);
    this.spinnerService.hide();
  }

  public async deleteTransactions() {
    this.spinnerService.show();
    await this.dataService.deleteTransactions();
    this.spinnerService.hide();
  }

  public setMoney() {
    this.modalService.open(SetMoneyComponent);
  }

  public createUser() {
    this.modalService.open(CreateUserComponent);
  }
}
