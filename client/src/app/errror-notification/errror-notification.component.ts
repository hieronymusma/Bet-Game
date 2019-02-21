import { Component, OnInit } from "@angular/core";
import { ErrorNotificationService } from "../services/error-notification.service";
import { ErrorMessage } from "../error";
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: "app-errror-notification",
  templateUrl: "./errror-notification.component.html",
  styleUrls: ["./errror-notification.component.scss"]
})
export class ErrrorNotificationComponent implements OnInit {

  public showErrorModal = false;

  constructor(private errorNotification: ErrorNotificationService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
      this.errorNotification.errorOccured.subscribe((() => {
          this.openModal();
      }).bind(this));
  }

  get error(): ErrorMessage {
    if (this.errorNotification.firstError) {
      return this.errorNotification.firstError;
    }
    return {
      longmessage: "",
      shortmessage: "",
      title: ""
    }
  }

  public openModal() {
    this.showErrorModal = true;
    this.spinnerService.hide();
    $("#errorModal").modal("show");
  }

  public closeModal() {
    this.showErrorModal = false;
    return true;
  }
}
