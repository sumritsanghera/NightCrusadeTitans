import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { nanoid } from 'nanoid';
import { Report } from './report';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reports:Report[]
  private topURL = 'https://272.selfip.net/apps/'; 
  private appKey = 'gtGERumASi';
  private collection = 'reports';

  constructor(private http: HttpClient) { 
    //call to backend
    this.reports = []
  }

  pull(): Promise<Report[]> {
    const url = `${this.topURL}${this.appKey}/collections/${this.collection}/documents/`;
    let fetchedReports:Promise<{key:string, data:string}[]> = firstValueFrom(this.http.get<{key:string, data:string}[]>(url));
    
    return fetchedReports.then(reports => {
      let parsedReports: Report[] = [];
      for(let i = 0; i < reports.length; i++) {
        parsedReports.push(JSON.parse(reports[i].data));
      }
      return parsedReports;
    });
  }


  add(newReport: Report): Promise<any> {
    const url = `${this.topURL}${this.appKey}/collections/${this.collection}/documents/`;
    const headers = { 'Content-Type': 'application/json' };
    let newReportJSON: string = JSON.stringify(newReport);
    let key = newReport.id.toString();
    const body = { key: key, data: newReportJSON };
    return firstValueFrom(this.http.post(url, body, { headers }));
  }

  getReportById(reportId: string): Promise<Report> {
    const url = `${this.topURL}${this.appKey}/collections/${this.collection}/documents/${reportId}`;
    return firstValueFrom(this.http.get<{key: string, data: string}>(url)).then(response => {
      return JSON.parse(response.data);
    });
  }

  delete(del_report: Report): Promise<any> {
    const url = `${this.topURL}${this.appKey}/collections/${this.collection}/documents/${del_report.id}`;
    return firstValueFrom(this.http.delete(url));
  }

  ngOnInit(): void {
    const url = `${this.topURL}${this.appKey}/collections/${this.collection}/documents/`
    this.http.get(url)
      .subscribe((data)=>{
        console.log(data);
      })
  }

  get(): void {
    const url = `${this.topURL}${this.appKey}/collections/${this.collection}/documents/`
    this.http.get(url)
      .subscribe((data)=>{
        console.log(data);
      })
  }

  generateId(): string {
    return nanoid();
  }
}

  // get() {
  //   return this.reports
  // }

  // add(newReport:any){
  //   newReport.added_on = (new Date()).getTime()
  //   this.reports.push(newReport)
  //   console.log(this.reports)
  // }

  // delete(del_report:string){
  //   this.reports = this.reports.filter((r) => r.name != del_report)
  //   return this.reports

  // }

