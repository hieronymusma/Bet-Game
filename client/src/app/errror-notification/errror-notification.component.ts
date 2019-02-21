import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { ErrorMessage } from "../error";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-errror-notification",
  templateUrl: "./errror-notification.component.html",
  styleUrls: ["./errror-notification.component.scss"]
})
export class ErrrorNotificationComponent {

  public error: ErrorMessage;

  constructor(public activeModal: NgbActiveModal, private changeDetectorRef: ChangeDetectorRef) { }

  public update() {
    this.changeDetectorRef.detectChanges();
  }
}
