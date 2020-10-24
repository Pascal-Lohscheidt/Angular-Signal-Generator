import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const PI_X_TWO = Math.PI * 2;
// const DEG_TO_RAD = Math.PI / 180.0;
// const RAD_TO_DEG =  180.0 / Math.PI;
const GRAPH_COLORS = ['blue', 'red', 'yellow'];


@Injectable({
  providedIn: 'root'
})
export class ChartService {
  curves = [];
  selectedCurve;

  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();

  constructor() {
    this.createStandardCurves(); //Making sure thatt we have a start default curve for each slot
    this.selectCurve(0); //Making sure the first curve is  selected as the default starter curve
  }

  createStandardCurves(): void {
    let defaultCurve = {
      id: -1,
      curveSettings: {
        amplitude: 5,
        frequency: 2,
        shift: 0,
        curveType: 'sinus',
        active: true
      }
    };

    for (let i = 0; i < 2; i++) {
      let curveCopy = Object.assign({}, defaultCurve);
      curveCopy.curveSettings = Object.assign({}, defaultCurve.curveSettings);
      curveCopy.id = i;
      curveCopy.curveSettings.frequency = i + 1;
      this.curves.push(curveCopy);
    }
    console.log(this.curves);
  }

  selectCurve(curveId): void {
    this.selectedCurve = this.curves.find(i => i.id === curveId)
    this.notify.next();
  }

  changeSettingsOfSelectedCurve(settings):void {
    this.selectedCurve.curveSettings = settings;
    this.notify.next();
  }

  getAllCurves() {
    return this.curves;
  }

  getSelectedCurve() {
    return this.selectedCurve;
  }


  //This function uses all the chart settings to create the data needed for the chart

  generateGraphs() {
    let data = [];
    this.curves.forEach(curve => {
      if(curve.curveSettings.active) data.push(this.generateGraphData(curve.curveSettings)); //ONLY if the curve is active show it in the graph
    });


    //If there is more than more curve add them upp to get a result curve
    if(data.length > 1) {
      let newX = []; //We need a set of x
      let summedUpY = []; //We need a set of y which will result from the sum of the two other curves values

      for(let i:number = 0; i < data[0].x.length; i++)
      {
        console.log("reached");
        newX.push(data[0].x[i]);
        let y = 0;
        data.forEach(curve => {
          y += curve.y[i]; //Here every curve is summed up to have a result curve
        });
        summedUpY.push(y); //optional create offset for the last curve
      }
      let newCurveData = {
        x: newX,
        y: summedUpY,
        type: 'scatter',
        mode: 'lines+points',
        marker: {color: 'cyan'}
      }
      data.push(newCurveData);
    }

    return data;
  }

  private generateGraphData(settings) {
    let stepSize = 0.03;


    let xCoordinates = [];
    let yCoordinates = [];

    for (let step = 0; step < PI_X_TWO; step+= stepSize) {
      xCoordinates.push(step);
      yCoordinates.push(this.returnYValueSettingsBased(step, settings));
    }

    let data = {
      x: xCoordinates,
      y: yCoordinates,
      type: 'scatter',
      mode: 'lines+points',
      marker: {color: GRAPH_COLORS[settings.curveId]}
    }
    return data;
  }

  private returnYValueSettingsBased(x ,settings) {
    switch(settings.curveType)
    {
      case 'sinus':
        return settings.amplitude * Math.sin((x - settings.shift) * settings.frequency);
      case 'cosinus':
        return settings.amplitude * Math.cos((x - settings.shift) * settings.frequency);
      case 'square':
        return settings.amplitude * Math.sign(Math.sin((x - settings.shift)* settings.frequency));
      case 'triangle':
        return ((2 * settings.amplitude)/Math.PI) * Math.asin(Math.sin((x - settings.shift) * settings.frequency));
      default:
        return x;
    }
  }




}
