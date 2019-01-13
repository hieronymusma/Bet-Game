import { Component, OnInit } from "@angular/core";
import { DataService } from "./data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "client";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.Test();
  }

  private async Test() {
    await this.dataService.connect();
    this.dataService.TestMe().then(() => console.log("TestMe successful"));
    this.dataService.ServerCall();
  }
}
