import { Injectable } from "@angular/core";
import { HubConnectionBuilder, LogLevel, HubConnection, HubConnectionState } from "@aspnet/signalr";
import { BetTarget } from "../bet-target";
import { User } from "../server-interfaces/user";
import { Transaction } from "../set-transaction/transaction";

@Injectable({
  providedIn: "root"
})
export class DataService {

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
      .withUrl("http://" + window.location.hostname + ":5000/AdminHub")
      .configureLogging(LogLevel.Information)
      .build();
    this._hubConnection.onclose(error => this.onConnectionLost(error));
    this.connect();
  }

  private async connect(): Promise<void> {
      console.log("Connect to hub");
      return this._connectionPromise = this._hubConnection.start();
  }

  private onConnectionLost(error: Error): void {
    console.log("Connection was disconnected. Error:", error);
    this.connect();
  }

  public async recreateDatabase(): Promise<void> {
    console.log("Call recreateDatabse");
    await this.connectionPromise();
    return this._hubConnection.invoke("RecreateDatabase");
  }

  public async bookTransactions(target: BetTarget): Promise<void> {
    console.log("Call book transactions");
    await this.connectionPromise();
    return this._hubConnection.invoke("BookTransactions", target);
  }

  public async deleteTransactions(): Promise<void> {
    console.log("Call delete transactions");
    await this.connectionPromise();
    return this._hubConnection.invoke("DeleteTransactions");
  }

  public async getAllUsers(): Promise<Array<User>> {
    console.log("Call getAllUsers");
    await this.connectionPromise();
    return this._hubConnection.invoke("GetAllUsers");
  }

  public async changeMoney(user: User, money: number): Promise<void> {
    console.log("Call changeMoney with:", user);
    await this.connectionPromise();
    return this._hubConnection.invoke("ChangeMoney", user, money);
  }

  public async createUserAndReturnGuid(firstName: string, lastName: string): Promise<string> {
    console.log("Call CreateUserAndReturnGuid with:", firstName, lastName);
    await this.connectionPromise();
    return this._hubConnection.invoke<string>("CreateUserAndReturnGuid", firstName, lastName);
  }

  public async bookTransaction(transaction: Transaction): Promise<void> {
    console.log("Call book transaction with:", transaction);
    await this.connectionPromise();
    return this._hubConnection.invoke("BookTransaction", transaction);
  }
}
