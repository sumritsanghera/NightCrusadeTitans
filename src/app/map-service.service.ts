import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Report } from './report';
import { ReportService } from './report.service';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {
  refreshMap$ = new Subject<void>();
  map!: L.Map;
  markersLayer: L.LayerGroup = L.layerGroup();

  constructor(private rs: ReportService) { }

  refreshMap(reportList: Report[]) {
    this.refreshMap$.next();
  }

  addMarker() {
    this.rs.reports.forEach(report => {
      if (report.location) {
        const lat = Number(report.location.toString().slice(0, 6));
        const lng = Number(report.location.toString().slice(7, 16));

        L.marker([lat, lng]).addTo(this.map).bindPopup(`<b>${report.villain}</b><br />Lat: ${lat}, Lng: ${lng}<br />` + report.extraInfo).openPopup();
        //add the marker to layers group
        this.markersLayer.addLayer(L.marker([lat, lng]));
      }
    });
  }
}




