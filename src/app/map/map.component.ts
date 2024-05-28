import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import * as L from 'leaflet';
import { ReportService } from '../report.service';
import { Report } from '../report';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  @Output() mapReady = new EventEmitter<L.Map>();
  reports:Report[]
  
  private map!: L.Map
  private markersLayer: L.LayerGroup = L.layerGroup();

  constructor(private rs: ReportService) { 
    this.reports = []
  }

  ngOnInit(): void {
    this.showMap();
    this.loadReports();
  }

  showMap() {
    this.map = L.map('map').setView([49.227, -122.93], 10.5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
    this.mapReady.emit(this.map);
  }

  loadReports() {
    this.rs.pull().then(reports => {
      reports.forEach(report => this.addMarker(report));
    }).catch(error => {
      console.error('Error loading reports:', error);
    });
  }

  addMarker(report: Report) {
    if (report.lat && report.lon) {
      var lat = report.lat
      var lng = report.lon
      const marker = L.marker([lat, lng]).bindPopup(`<b>${report.location}</b><br />Lat: ${lat}, Lng: ${lng}<br />` + 'Extra Info: ' + report.extraInfo);
      this.markersLayer.addLayer(marker);
    }
  }
}