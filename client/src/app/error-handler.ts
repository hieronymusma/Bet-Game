import { ErrorHandler, Injectable, Injector, Inject } from "@angular/core";
import { ErrorNotificationService } from "./services/error-notification.service";

@Injectable()
export class AppErrorHandler extends ErrorHandler {

    constructor(private errorNotificationService: ErrorNotificationService) {
        super();
    }

    handleError(error: any): void {
        super.handleError(error);

        let errMessage = error.toString();

        if (error.stack) {
            errMessage += `\n ${error.stack}`;
        }

        this.errorNotificationService.throwNewError("Angular error occured",
            "Open console for more information",
            errMessage);
    }
}