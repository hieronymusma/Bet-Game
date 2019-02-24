import { Injectable, EventEmitter } from "@angular/core";
import { HubConnectionBuilder, LogLevel, HubConnection } from "@aspnet/signalr";
import { UserStatus } from "../server-interfaces/user-status";

@Injectable({
  providedIn: "root"
})
export class DataService {

  public newUserDataAvailable$ = new EventEmitter<Array<UserStatus>>();

  private _hubConnection: HubConnection;
  private _connectionPromise: Promise<void>;

  constructor() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl("http://" + window.location.hostname + ":5000/DashboardHub")
      .configureLogging(LogLevel.Information)
      .build();
    this._hubConnection.onclose(error => this.onConnectionLost(error));
    this._hubConnection.on("UpdateDashboard", data => { this.newUserDataAvailable$.emit(data); });
    this.connect();
  }

  private connect(): void {
    console.log("Connect to hub");
    this._connectionPromise = this._hubConnection.start();
  }

  private onConnectionLost(error: Error): void {
    console.log("Connection was disconnected. Error:", error);
    this.connect();
  }

  public async getAllUser(): Promise<void> {
    console.log("Call GetAllUser");
    await this._connectionPromise;
    const data = await this._hubConnection.invoke<Array<UserStatus>>("GetAllUser");
    this.newUserDataAvailable$.emit(data);
  }
}
