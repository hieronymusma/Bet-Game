import { Injectable } from "@angular/core";
import { Transaction, BetTarget } from "../server-interfaces/transaction";
import { ChartData } from "../chart-data";

@Injectable({
  providedIn: "root"
})
export class ChartService {

  public GetCountData(transactions: Array<Transaction>): Array<ChartData> {
    const blueCount = transactions.filter(x => x.betTarget === BetTarget.Blue).length;
    const redCount = transactions.filter(x => x.betTarget === BetTarget.Red).length;

    return [
      { name: "Blau", value: blueCount },
      { name: "Rot", value: redCount }
    ];
  }

  public GetMoneyData(transactions: Array<Transaction>): Array<ChartData> {
    const blueMoney = transactions
    .filter(x => x.betTarget === BetTarget.Blue)
    .map(x => x.betMoney)
    .reduce((accumulator, current) => accumulator + current);

    const redMoney = transactions
    .filter(x => x.betTarget === BetTarget.Red)
    .map(x => x.betMoney)
    .reduce((accumulator, current) => accumulator + current);

    return [
      { name: "Blau", value: blueMoney },
      { name: "Rot", value: redMoney }
    ];
  }

  public GetBestMoney(transactions: Array<Transaction>): Array<Transaction> {
    const sorted = transactions.sort((a, b) => b.betMoney - a.betMoney);
    const best = sorted.slice(0, 3);

    let index = 2;
    while (sorted[index] && sorted[index + 1] && sorted[index].betMoney === sorted[index + 1].betMoney) {
      best[index + 1] = sorted[index + 1];
      index++;
    }
    return best;
  }
}
