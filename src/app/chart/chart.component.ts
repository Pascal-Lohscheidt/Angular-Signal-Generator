import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartService } from '../chart.service';
import { Subscription } from 'rxjs';

//Summary:
//That component just listens to the observable for changes.
//Any time that happens it updates the chart

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass'],
})
export class ChartComponent implements OnInit, OnDestroy {

  private chartDataSubscription: Subscription;
  curves = [];

  public graph = {
    data: this.chartService.generateGraphs(),
    layout: {title: ''}
  };

  constructor(private chartService : ChartService) {
    this.curves = chartService.getAllCurves();
   }

  ngOnInit(): void {
    this.chartDataSubscription = this.chartService.notifyObservable$.subscribe(() => {
        this.updateChartData();
    });
  }

  ngOnDestroy() {
    this.chartDataSubscription.unsubscribe();
  }

  //This function fills in the nessary data of the graph and asks the chartService
  //for the right data set of all curves.
  updateChartData(){
    this.curves = this.chartService.getAllCurves();
    //updating the graph Note this is not really  perfromant as we are generating all graphs
    this.graph = {
      data: this.chartService.generateGraphs(),
      layout: {title: ''}
    };
  }

}
