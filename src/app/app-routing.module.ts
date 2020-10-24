import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartViewComponent } from './chart-view/chart-view.component';


const routes: Routes = [{
  path: "", component: ChartViewComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
