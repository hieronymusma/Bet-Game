import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import { User } from "../server-interfaces/user";
import { DataService } from "../services/data.service";
import { NgxSpinnerService } from "ngx-spinner";
import { UserSelectorComponent } from "../user-selector/user-selector.component";

@Component({
  selector: "app-set-money",
  templateUrl: "./set-money.component.html",
  styleUrls: ["./set-money.component.scss"]
})
export class SetMoneyComponent {

  @ViewChild(UserSelectorComponent) userSelector: UserSelectorComponent;

  public money = 0;

  constructor(public activeModal: NgbActiveModal, private dataService: DataService, private spinner: NgxSpinnerService) {}

  public async setMoney() {
    this.spinner.show();
    if (this.userSelector.user) {
      await this.dataService.changeMoney(this.userSelector.user, this.money);
    }
    this.spinner.hide();
  }

}
