import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  //@Input() report:any
  @Output() delete = new EventEmitter()

  report: any;

  constructor(private route: ActivatedRoute, private rs: ReportService) { }

  ngOnInit() {
    // Get the report id from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    // Find the report with the id
    this.report = this.rs.reports.find(report => report.id === id);
  }


  onDelete(evt:any,entry_to_be_deleted:string) {
    evt['delete_report'] = entry_to_be_deleted
    //console.log(evt)
    // send it to the parent component
    this.delete.emit(evt)
  }

}
