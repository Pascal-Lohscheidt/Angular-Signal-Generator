import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChartService } from '../chart.service';
import { Subscription } from 'rxjs';

//Summary:
//The component handles the change settings form of the curve.
//It listens to the chart service (observable) to get notified when the
//selected curve ref was replaced with another curve and updates the form data.

@Component({
  selector: 'app-modulate-settings',
  templateUrl: './modulate-settings.component.html',
  styleUrls: ['./modulate-settings.component.sass']
})
export class ModulateSettingsComponent implements OnInit, OnDestroy {

  private chartDataSubscription: Subscription;
  settingsForm;

  constructor(
    private formBuilder: FormBuilder,
    private chartService: ChartService) {
      this.settingsForm = this.formBuilder.group(this.chartService.getSelectedCurve().curveSettings);
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
    this.settingsForm = this.formBuilder.group(this.chartService.getSelectedCurve().curveSettings);
  }

  onSubmit(settingsData): void {
    this.chartService.changeSettingsOfSelectedCurve(settingsData);
  };
}

