import { Component } from "@angular/core";
import { UserStatus } from "../server-interfaces/user-status";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent {

  public userData: Array<UserStatus> = [];

  constructor(private dataService: DataService) {
    this.dataService.newUserDataAvailable$.subscribe((data: Array<UserStatus>) => this.userData = data);
    this.dataService.getAllUser();
  }

}
