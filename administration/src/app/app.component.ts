import { Component } from "@angular/core";
import { DataService } from "./services/data.service";
import { NgxSpinnerService } from "ngx-spinner";
import { BetTarget } from "./bet-target";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  targets = BetTarget;

  constructor(private dataService: DataService, private spinnerService: NgxSpinnerService) { }

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
}
