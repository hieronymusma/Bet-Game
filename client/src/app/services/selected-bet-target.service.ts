import { Injectable } from "@angular/core";
import { BetTarget } from "../server-interfaces/transaction";

@Injectable({
  providedIn: "root"
})
export class SelectedBetTargetService {

  public selectedTarget: BetTarget;

}
