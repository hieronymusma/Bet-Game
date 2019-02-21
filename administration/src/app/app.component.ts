import { Component } from "@angular/core";
import { DataService } from "./services/data.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private dataService: DataService, private spinnerService: NgxSpinnerService) { }

  public async recreateDatabse() {
    this.spinnerService.show();
    await this.dataService.recreateDatabase();
    this.spinnerService.hide();
  }
}
