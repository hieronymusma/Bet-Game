import { Injectable } from "@angular/core";
import { HubConnectionBuilder, LogLevel, HubConnection, HubConnectionState, JsonHubProtocol } from "@aspnet/signalr";
import { User } from "../server-interfaces/user";
import { Transaction } from "../server-interfaces/transaction";

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
      .withHubProtocol(new JsonHubProtocol)
      .build();
    this._hubConnection.onclose(error => this.onConnectionLost(error));
    this.connect();
  }

  private connect(): void {
      console.log("Connect to hub");
      this._connectionPromise = this._hubConnection.start();
  }

  public async isUserValid(guid: string): Promise<boolean> {
    console.log("Call IsUserValid with following guid:", guid);
    await this._connectionPromise;
    return this._hubConnection.invoke<boolean>("IsUserValid", guid);
  }

  public async createUserAndReturnGuid(firstName: string, lastName: string): Promise<string> {
    console.log("Call CreateUserAndReturnGuid with:", firstName, lastName);
    await this._connectionPromise;
    return this._hubConnection.invoke<string>("CreateUserAndReturnGuid", firstName, lastName);
  }

  public async bookTransaction(transaction: Transaction): Promise<boolean> {
    console.log("Call BookTransaction with:", transaction);
    await this._connectionPromise;
    return this._hubConnection.invoke<boolean>("BookTransaction", transaction);
  }

  public async getAccountInformation(guid: string): Promise<User> {
    console.log("Call GetAccountInformation with:", guid);
    await this._connectionPromise;
    return this._hubConnection.invoke<User>("GetAccountInformation", guid);
  }

  public async isAlreadyAnTransactionPending(guid: string): Promise<boolean> {
    console.log("Call IsAlreadyAnTransactionPending with:", guid);
    await this._connectionPromise;
    return this._hubConnection.invoke<boolean>("IsAlreadyAnTransactionPending", guid);
  }

  private onConnectionLost(error: Error): void {
    console.log("Connection was disconnected. Error:", error);
    this.connect();
  }
}
