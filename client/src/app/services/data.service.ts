import { Injectable } from "@angular/core";
import { HubConnectionBuilder, LogLevel, HubConnection, HubConnectionState } from "@aspnet/signalr";

@Injectable({
  providedIn: "root"
})
export class DataService {

  private _hubConnection: HubConnection;

  constructor() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl("http://" + window.location.hostname + ":5000/BetHub")
      .configureLogging(LogLevel.Information)
      .build();
    this.connect();
  }

  public async connect(): Promise<void> {
    if (this._hubConnection.state === HubConnectionState.Disconnected) {
      return this._hubConnection.start();
    }
    return Promise.resolve();
  }

  public async IsUserValid(guid: string): Promise<boolean> {
    return true;
  }


  public TestMe(): Promise<void> {
    return this._hubConnection.invoke<string>("TestMe", "42").then(value => {
      if (value !== "42") {
        throw new Error("Failure");
      }
    });
  }

  public ServerCall(): Promise<void> {
    return this._hubConnection.invoke("ServerCall");
  }

  private ClientCall() {
    console.log("Client call executed");
  }
}
