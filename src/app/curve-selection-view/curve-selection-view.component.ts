import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartService } from '../chart.service';
import { Subscription } from 'rxjs';

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
