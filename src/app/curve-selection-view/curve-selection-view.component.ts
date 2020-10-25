import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartService } from '../chart.service';
import { Subscription } from 'rxjs';

//Summary:
//This component listens to the chart service(observable) for curve data changes.
//This way it can update its presented curve data.
//Also it manipulates the curve that is currently selected for the "modulate settings component"

@Component({
  selector: 'app-curve-selection-view',
  templateUrl: './curve-selection-view.component.html',
  styleUrls: ['./curve-selection-view.component.sass']
})
export class CurveSelectionViewComponent implements OnInit, OnDestroy {

  private chartDataSubscription: Subscription;
  curves = [];

  constructor(
    private chartService: ChartService) {
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

  updateChartData() {
    this.curves = this.chartService.getAllCurves();
  }


  selectCurve(id): void {
    this.chartService.selectCurve(id);
  }

}
