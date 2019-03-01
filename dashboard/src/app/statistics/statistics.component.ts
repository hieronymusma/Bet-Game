import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { Transaction } from "../server-interfaces/transaction";
import { ChartService } from "../services/chart.service";
import { ChartData } from "../chart-data";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"]
})
export class StatisticsComponent implements OnInit {

  public countData: Array<ChartData> = [];
  public bestData: Array<Transaction> = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = "Spieler";
  showYAxisLabel = true;
  yAxisLabel = "Anzahl";

  colorScheme = {
    domain: ["#007bff", "#c82333"]
  };

  constructor(private dataService: DataService, private betCount: ChartService) { }

  public async ngOnInit() {
    this.dataService.newChartDataAvailable$.subscribe(transactions => this.calcData(transactions));
    this.calcData(await this.dataService.getAllTransactions());
  }

  private calcData(transactions: Array<Transaction>) {
    this.countData = this.betCount.GetCountData(transactions);
    this.bestData = this.betCount.GetBestMoney(transactions);
  }
}
