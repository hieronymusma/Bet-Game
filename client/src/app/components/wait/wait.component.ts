import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DataService } from "src/app/services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-wait",
  templateUrl: "./wait.component.html",
  styleUrls: ["./wait.component.scss"]
})
export class WaitComponent implements OnInit {

  constructor(
    private spinnerService: NgxSpinnerService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.spinnerService.show();
    this.dataService.waitingFinished$.subscribe(() => this.redirectToBetComponent());
  }

  private redirectToBetComponent() {
    this.spinnerService.hide();
    this.router.navigate(["/bet"]);
  }
}
