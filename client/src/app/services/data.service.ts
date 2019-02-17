import { Injectable } from "@angular/core";
import { HubConnectionBuilder, LogLevel, HubConnection, HubConnectionState } from "@aspnet/signalr";

@Injectable({
  providedIn: "root"
})
export class DataService {

  private _hubConnection: HubConnection;
  private _connectionPromise: Promise<void>;

  constructor() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl("http://" + window.location.hostname + ":5000/BetHub")
      .configureLogging(LogLevel.Information)
      .build();
    this._hubConnection.onclose(error => this.onConnectionLost(error));
    this.connect();
  }

  private connect(): void {
      console.log("Connect to hub");
      this._connectionPromise = this._hubConnection.start();
  }

  public async IsUserValid(guid: string): Promise<boolean> {
    console.log("Call IsUserValid with following guid:", guid);
    await this._connectionPromise;
    return this._hubConnection.invoke<boolean>("IsUserValid", guid);
  }

  public async createUserAndReturnGuid(firstName: string, lastName: string) {
    console.log("Call CreateUserAndReturnGuid with:", firstName, lastName);
    await this._connectionPromise;
    return this._hubConnection.invoke<string>("CreateUserAndReturnGuid", firstName, lastName);
  }

  private onConnectionLost(error: Error): void {
    console.log("Connection was disconnected. Error:", error);
    this.connect();
  }
}
