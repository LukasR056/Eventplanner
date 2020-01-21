import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  styles: ['agm-map { height: 80%; /* height is required */ }'],
  template: ` <agm-map [latitude]='latitude' [longitude]='longitude' [mapTypeId]='mapType'></agm-map>`
})
export class MapsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  latitude = -28.68352;
  longitude = -147.20785;
  mapType = 'satellite';

}
