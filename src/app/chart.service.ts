import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const PI_X_TWO = Math.PI * 2;
const GRAPH_COLORS = ['blue', 'red', 'yellow'];

//Summary:
//This service provides data for components and makes sure any
//component that is interested in beeing notified about a state change is informed
//This service acts as an observable whereas the components are the observers.
//Also this service knows how to create curves and knows how to change their data.
//This behaviour is injected in the components.

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  curves = [];
  selectedCurve;

  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();

  constructor() {
    this.createStandardCurves(); //Making sure that we have a start default curve for each slot
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

      //This section ensures that the curves have a minor difference right at the beginning so they
      //don´t overlap completly
      curveCopy.id = i;
      curveCopy.curveSettings.frequency = i + 1;

      this.curves.push(curveCopy);
    }
  }

  selectCurve(curveId): void {
    this.selectedCurve = this.curves.find(i => i.id === curveId)
    this.notify.next(); //Notify the observers that the curve data state has changed
  }

  changeSettingsOfSelectedCurve(settings):void {
    this.selectedCurve.curveSettings = settings;
    this.notify.next(); //Notify the observers that the curve data state has changed
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
      if(curve.curveSettings.active) data.push(this.generateGraphData(curve.curveSettings, curve.id)); //ONLY if the curve is active show it in the graph
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
        summedUpY.push(y); //optional: create an offset in y direction for the result curve. This way you can see the result better "side by side"
      }

      let newCurveData = {
        x: newX,
        y: summedUpY,
        type: 'scatter',
        mode: 'lines+points',
        marker: {color: 'cyan'},
        name: 'result curve'
      }
      data.push(newCurveData);
    }

    return data;
  }

  private generateGraphData(settings, curveId) {
    //defining the resolution of the curve (the bigger the res the slower the app gets)
    //Keep in mind that you have to decrease that setting in order to portay higher res.
    let stepSize = 0.03;

    let xCoordinates = [];
    let yCoordinates = [];

    //creating a x and y value from 0 to 2π portraying a whole standard period.
    for (let step = 0; step < PI_X_TWO; step+= stepSize) {
      xCoordinates.push(step);
      yCoordinates.push(this.returnYValueSettingsBased(step, settings));
    }

    let data = {
      x: xCoordinates,
      y: yCoordinates,
      type: 'scatter',
      mode: 'lines+points',
      marker: {color: GRAPH_COLORS[settings.id]},
      name: (curveId + 1).toString() + '# curve'
    }
    return data;
  }

  //This function takes care of giving the right y value for the corresponding x value.
  //If you add another curve type. Make sure it´s formular is added here and that you add
  //the new type to the "modulate-settings"
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
