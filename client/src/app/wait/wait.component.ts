import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-wait",
  templateUrl: "./wait.component.html",
  styleUrls: ["./wait.component.scss"]
})
export class WaitComponent implements OnInit {

  constructor(private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
  }

}
