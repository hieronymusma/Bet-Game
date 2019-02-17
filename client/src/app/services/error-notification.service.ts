import { Injectable, Output, EventEmitter } from "@angular/core";
import { ErrorMessage } from "../error";

@Injectable({
  providedIn: "root"
})
export class ErrorNotificationService {

    private _errorMessages = new Array<ErrorMessage>();

    @Output() errorOccured = new EventEmitter();

    get hasErrors(): boolean {
        return this._errorMessages.length > 0 ? true : false;
    }

    get errorMessages(): Array<ErrorMessage> {
        return this._errorMessages;
    }

    get firstError(): ErrorMessage {
        if (this._errorMessages.length > 0) {
            return this._errorMessages[0];
        } else {
            return null;
        }
    }

    public throwNewError(title: string, shortmessage: string, longmessage: string) {
        const errorMessage = new ErrorMessage(title, shortmessage, longmessage);
        this._errorMessages.push(errorMessage);
        this.errorOccured.emit();
    }
}
