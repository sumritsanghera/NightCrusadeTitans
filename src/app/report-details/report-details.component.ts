import { Component } from '@angular/core';
import { Report } from '../report';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent {
  report!: Report; // Declare the report property

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    const reportId = this.route.snapshot.paramMap.get('name');
    this.reportService.getReportById(this.report.name).then(fetchedReport => {
      this.report = fetchedReport; // Assign the fetched report to the report property
    }).catch(error => {
      console.error('Error fetching report:', error);
    });
  }
}
