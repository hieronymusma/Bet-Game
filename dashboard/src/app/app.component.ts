import { Component } from "@angular/core";
import { DataService } from "./services/data.service";
import { UserStatus } from "./server-interfaces/user-status";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  public userData: Array<UserStatus>;

  constructor(private dataService: DataService) {
    this.dataService.newUserDataAvailable$.subscribe((data: Array<UserStatus>) => this.userData = data);
    this.dataService.getAllUser();
  }
}
