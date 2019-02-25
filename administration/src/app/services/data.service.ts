import { Injectable } from "@angular/core";
import { HubConnectionBuilder, LogLevel, HubConnection } from "@aspnet/signalr";
import { BetTarget } from '../bet-target';

@Injectable({
  providedIn: "root"
})
export class DataService {

  private _hubConnection: HubConnection;
  private _connectionPromise: Promise<void>;

  constructor() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl("http://" + window.location.hostname + ":5000/AdminHub")
      .configureLogging(LogLevel.Information)
      .build();
    this._hubConnection.onclose(error => this.onConnectionLost(error));
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

  public async recreateDatabase(): Promise<void> {
    console.log("Call recreateDatabse");
    await this._connectionPromise;
    return this._hubConnection.invoke("RecreateDatabase");
  }

  public async bookTransactions(target: BetTarget): Promise<void> {
    console.log("Call book transactions");
    await this._connectionPromise;
    return this._hubConnection.invoke("BookTransactions", target);
  }

  public async deleteTransactions(): Promise<void> {
    console.log("Call delete transactions");
    await this._connectionPromise;
    return this._hubConnection.invoke("DeleteTransactions");
  }
}
