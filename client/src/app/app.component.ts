import { Component } from "@angular/core";
import { ErrorNotificationService } from "./services/error-notification.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ErrorMessage } from "./error";
import { ErrrorNotificationComponent } from "./errror-notification/errror-notification.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  constructor(private errorNotificationService: ErrorNotificationService, private modalService: NgbModal) {
    this.errorNotificationService.errorOccured.subscribe(error => this.openErrorDialog(error));
  }

  private openErrorDialog(errorMessage: ErrorMessage) {
    const ref = this.modalService.open(ErrrorNotificationComponent, { windowClass: "modal modal-dialog" });
    const instance: ErrrorNotificationComponent = ref.componentInstance;
    instance.error = errorMessage;
    instance.update();
  }

}
