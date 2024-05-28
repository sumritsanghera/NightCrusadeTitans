import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportAddFormComponent } from './report-add-form/report-add-form.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportComponent } from './report/report.component';
import { ReportDetailsComponent } from './report-details/report-details.component';

const appRoutes:Routes = [
  { path: 'report', component: ReportListComponent },
  { path: 'report/add', component: ReportAddFormComponent },
  { path: 'report/:id', component: ReportComponent },
  // { path: 'report/:name', component: PersonEditComponent },
  { path: '', redirectTo: '/report', pathMatch: 'full'}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class RoutingModule { }
