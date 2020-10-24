import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { ModulateSettingsComponent } from './modulate-settings/modulate-settings.component';
import { ChartComponent } from './chart/chart.component';
import { ChartService } from './chart.service';
import { CurveSelectionViewComponent } from './curve-selection-view/curve-selection-view.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    ChartViewComponent,
    ModulateSettingsComponent,
    ChartComponent,
    CurveSelectionViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PlotlyModule
  ],
  providers: [ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
