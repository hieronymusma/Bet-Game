import { Injectable, Output, EventEmitter } from "@angular/core";
import { ErrorMessage } from "../error";

@Injectable({
  providedIn: "root"
})
export class ErrorNotificationService {

    @Output() errorOccured = new EventEmitter<ErrorMessage>();

    public throwNewError(title: string, shortmessage: string, longmessage: string) {
        const errorMessage = new ErrorMessage(title, shortmessage, longmessage);
        this.errorOccured.emit(errorMessage);
    }
}
