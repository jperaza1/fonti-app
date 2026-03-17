import { Component, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { IMapViewerMarker } from '../../models/map-viewer-marker';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.css']
})
export class MapViewerComponent extends AppComponentBase implements OnInit {

  @Input() zoom: number = 4;

  @Input() lat: number;

  @Input() lng: number;

  @Input() markers: IMapViewerMarker[];

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onClickMap($event: MouseEvent) { }

  onClickMarker(label: string, index: number, marker: IMapViewerMarker) { }

  onDragMarker(marker: IMapViewerMarker, $event: MouseEvent) { }

  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }

}
