import { Component, ViewChild, ElementRef, Output , EventEmitter} from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';


@Component({
  selector: 'app-report-add-form',
  templateUrl: './report-add-form.component.html',
  styleUrls: ['./report-add-form.component.css']
})
export class ReportAddFormComponent {
  @Output() markerAdded = new EventEmitter<{ lat: number, lng: number }>();

  map!: L.Map;
  marker!: L.Popup;
  form: FormGroup;


  constructor(private rs: ReportService, private router: Router) {
    let formControls = {
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(1)
      ]),
      phoneNumber: new FormControl('',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
        Validators.pattern('[- +()0-9]+')
      ]),
      villain: new FormControl('',[
        Validators.required,
        Validators.minLength(1)
      ]),
      location: new FormControl('',[
        Validators.required,
        Validators.minLength(1)
      ]),
      lat: new FormControl('',[
        Validators.required,
      ]),
      lon: new FormControl('',[
        Validators.required,
      ]),
      picture: new FormControl(),
      extraInfo: new FormControl(),
    }
    this.form = new FormGroup(formControls);
  }  



  ngOnInit(): void {
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.map.on('click', (e:L.LeafletMouseEvent) => {
      if (this.map) {
        this.map.eachLayer((layer:any) => {
          if (layer instanceof L.Marker) {
            this.map?.removeLayer(layer);
          }
        });
      }
      L.marker(e.latlng).addTo(map).bindPopup("<b>Nussiance Location</b><br />").openPopup();
      this.markerAdded.emit({ lat: e.latlng.lat, lng: e.latlng.lng });

      this.form.controls['lat'].setValue(`${e.latlng.lat.toFixed(3)}`);
      this.form.controls['lon'].setValue(`${e.latlng.lng.toFixed(3)}`);

    });
  }


  onSubmit(newReport:any) {
    newReport.id = this.rs.generateId();
    newReport.added_on = new Date().getTime();
    newReport.resolved = false;
    this.rs.add(newReport)
    this.router.navigate([''])
    console.log(newReport)

  }
}


