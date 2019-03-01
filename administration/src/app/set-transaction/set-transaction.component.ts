import { Component, OnInit, ViewChild } from "@angular/core";
import { BetTarget, Transaction } from "./transaction";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../services/data.service";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "../server-interfaces/user";
import { UserSelectorComponent } from "../user-selector/user-selector.component";

@Component({
  selector: "app-set-transaction",
  templateUrl: "./set-transaction.component.html",
  styleUrls: ["./set-transaction.component.scss"]
})
export class SetTransactionComponent implements OnInit {

  @ViewChild(UserSelectorComponent) userSelector: UserSelectorComponent;

  public betTarget = BetTarget;

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

  private readonly transaction: Transaction = {
    betMoney: 0,
    betTarget: null,
    user: null,
   };

  constructor(public activeModal: NgbActiveModal, private dataService: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
  }

  public async createTransaction(): Promise<void> {
    this.spinner.show();
    this.transaction.user = this.userSelector.user;
    await this.dataService.bookTransaction(this.transaction);
    this.spinner.hide();
  }

}
