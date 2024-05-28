import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';
import { MapServiceService } from '../map-service.service';
import * as L from 'leaflet';
import { Report } from '../report';
import {Md5} from 'ts-md5';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports:Report[]
  @Output() report = new EventEmitter<Report>();
  @Output() moreInfoEvent = new EventEmitter<Report>();

  constructor(private router: Router, private rs: ReportService, private mapService: MapServiceService) {
    this.reports = []
  }

  //onReportDelete(evt:any) {
    //console.log(evt['delete_report']); // line for debugging
    //let delete_report = evt['delete_report'] 
    // this.people = this.people.filter((p) => p.name != delete_person)
    //this.reports = this.rs.delete(delete_report)    
  //}

  onReportDelete(report: any) {
    let password = prompt("Please enter your password to delete this report");
    if(password == null){
      return;
    } 
    let hashPass = Md5.hashStr(password).toString();
    if(hashPass === "fcab0453879a2b2281bc5073e3f5fe54"){
      this.rs.delete(report).then(() => {
        this.mapService.refreshMap(this.reports);
        // for(let report of this.reports){
        //   this.coordinates.emit(report);
        // }
        this.loadReports(); 
      }).catch(error => {
        console.error('Error deleting report:', error);
      });
    }
    else{
      alert("Incorrect password");
    }
  }

  //create a prompt which shows the contents of the report json
  
 

  // onView(evt:any) {
  //   console.log(evt['view_report']); // line for debugging
  //   let view_report = evt['view_report'] 
  //   // this.people = this.people.filter((p) => p.name != delete_person)
  //   this.reports = this.rs.view(view_report)
  //   this.router.navigate(['/report", this.report.name'])
  // }

  loadReports(): void {
    this.rs.pull().then(reports => {
      console.log('Reports from server:', reports);
      this.reports = reports;
    }).catch(error => {
      console.error('Error loading reports:', error);
    });
  }


  ngOnInit(): void {
    //this.reports = this.rs.get()
    this.loadReports();
    
  }

}
