import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.scss"]
})
export class CreateUserComponent implements OnInit {

  public firstName = "";
  public lastName = "";

  constructor(public activeModal: NgbActiveModal, private spinner: NgxSpinnerService, private dataService: DataService) { }

  ngOnInit() {
  }

  public async createUser(): Promise<void> {
    this.spinner.show();
    await this.dataService.createUserAndReturnGuid(this.firstName, this.lastName);
    this.spinner.hide();
  }

}
