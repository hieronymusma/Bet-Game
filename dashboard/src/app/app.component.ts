import { Component, OnInit } from "@angular/core";
import { DataService } from "./services/data.service";
import { UserStatus } from "./server-interfaces/user-status";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  public isTableActive = true;

  constructor(private dataService: DataService) {  }

  ngOnInit(): void {
    this.dataService.toggleDashboardMode$.subscribe(() => this.isTableActive = !this.isTableActive);
  }
}
