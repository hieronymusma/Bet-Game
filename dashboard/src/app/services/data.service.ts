import { Injectable, EventEmitter } from "@angular/core";
import { HubConnectionBuilder, LogLevel, HubConnection, HubConnectionState } from "@aspnet/signalr";
import { UserStatus } from "../server-interfaces/user-status";
import { Transaction } from "../server-interfaces/transaction";

@Injectable({
  providedIn: "root"
})
export class DataService {

  public newUserDataAvailable$ = new EventEmitter<Array<UserStatus>>();
  public newChartDataAvailable$ = new EventEmitter<Array<Transaction>>();
  public toggleDashboardMode$ = new EventEmitter();

  private _hubConnection: HubConnection;
  private _connectionPromise: Promise<void>;

  private async connectionPromise(): Promise<void> {
    try {
      return await this._connectionPromise;
    } catch (error) {
      if (this._hubConnection.state === HubConnectionState.Disconnected) {
        await this.connect();
      }
    }
  }

  constructor() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl("http://" + window.location.hostname + ":5000/DashboardHub")
      .configureLogging(LogLevel.Information)
      .build();
    this._hubConnection.onclose(error => this.onConnectionLost(error));
    this._hubConnection.on("UpdateDashboard", (data, transactions) => {
      this.newUserDataAvailable$.emit(data);
      this.newChartDataAvailable$.emit(transactions);
    });
    this._hubConnection.on("ToggleDashboardMode", () => this.toggleDashboardMode$.emit());
    this.connect();
  }

  private connect(): Promise<void> {
    console.log("Connect to hub");
    return this._connectionPromise = this._hubConnection.start();
  }

  private onConnectionLost(error: Error): void {
    console.log("Connection was disconnected. Error:", error);
    this.connect();
  }

  public async getAllUser(): Promise<void> {
    console.log("Call GetAllUser");
    await this.connectionPromise();
    const data = await this._hubConnection.invoke<Array<UserStatus>>("GetAllUser");
    this.newUserDataAvailable$.emit(data);
  }

  public async getAllTransactions(): Promise<Array<Transaction>> {
    console.log("Call GetAllTransactions");
    await this.connectionPromise();
    return this._hubConnection.invoke("GetAllTransactions");
  }
}
