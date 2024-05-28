import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  constructor() { }
  
  private markerLocation = new BehaviorSubject<L.LatLng | null>(null);

  setMarkerLocation(location: L.LatLng) {
    this.markerLocation.next(location);
  }

  getMarkerLocation() {
    return this.markerLocation.asObservable();
  }
}
