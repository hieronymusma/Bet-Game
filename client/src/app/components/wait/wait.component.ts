import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DataService } from "src/app/services/data.service";
import { Router } from "@angular/router";
import { SelectedBetTargetService } from "src/app/services/selected-bet-target.service";
import { BetTarget } from "src/app/server-interfaces/transaction";

@Component({
  selector: "app-wait",
  templateUrl: "./wait.component.html",
  styleUrls: ["./wait.component.scss"]
})
export class WaitComponent implements OnInit {

  private get betTarget(): BetTarget {
    return this.selectedBetTarget.selectedTarget;
  }

  constructor(
    private spinnerService: NgxSpinnerService,
    private dataService: DataService,
    private router: Router,
    private selectedBetTarget: SelectedBetTargetService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.dataService.waitingFinished$.subscribe(() => this.redirectToBetComponent());
  }

  private redirectToBetComponent() {
    this.spinnerService.hide();
    this.router.navigate(["/bet"]);
  }
}
