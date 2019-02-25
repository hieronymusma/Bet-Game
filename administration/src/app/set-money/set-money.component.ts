import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-set-money",
  templateUrl: "./set-money.component.html",
  styleUrls: ["./set-money.component.scss"]
})
export class SetMoneyComponent {

  public money = 0;

  constructor(public activeModal: NgbActiveModal) {}

}
