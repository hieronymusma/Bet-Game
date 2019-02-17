import { Component, OnInit } from "@angular/core";
import { ErrorNotificationService } from "../services/error-notification.service";
import { ErrorMessage } from "../error";

@Component({
  selector: "app-errror-notification",
  templateUrl: "./errror-notification.component.html",
  styleUrls: ["./errror-notification.component.scss"]
})
export class ErrrorNotificationComponent implements OnInit {

  public showErrorModal = false;

  constructor(private errorNotification: ErrorNotificationService) { }

  ngOnInit(): void {
      this.errorNotification.errorOccured.subscribe((() => {
          this.showErrorModal = true;
      }).bind(this));
  }

  get error(): ErrorMessage {
      return this.errorNotification.firstError;
  }

  closeModal() {
      this.showErrorModal = false;
  }
}
