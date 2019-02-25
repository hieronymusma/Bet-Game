import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
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
export class WaitComponent implements OnInit, AfterViewInit {

  private get betTarget(): BetTarget {
    return this.selectedBetTarget.selectedTarget;
  }

  constructor(
    private spinnerService: NgxSpinnerService,
    private dataService: DataService,
    private router: Router,
    private selectedBetTarget: SelectedBetTargetService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.spinnerService.show();
    this.dataService.waitingFinished$.subscribe(() => this.redirectToBetComponent());
  }

  ngAfterViewInit(): void {
    const color = this.betTarget === BetTarget.Blue ? "rgba(0,123,255,0.5)" : "rgba(220,53,69,0.5)";
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = color;
  }

  private redirectToBetComponent() {
    this.spinnerService.hide();
    this.router.navigate(["/bet"]);
  }
}
