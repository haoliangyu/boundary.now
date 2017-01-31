import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialog } from '@angular/material';
import { saveAs } from 'file-saver';
import AboutDialogComponent from '../about.dialog/about.dialog.component';
import MapService from '../../services/map.service';

@Component({
  selector: 'app',
  template: require<any>('./app.component.html'),
  styles: [
    require<any>('./app.component.less')
  ],
  providers: [MapService]
})
export default class AppComponent {
  private isGeocoding: boolean;
  private noResult: boolean;
  private results: Array<any>;
  private placeName: string;
  private selectedIndex: number;

  constructor(private http: Http, private mapService: MapService, private dialog: MdDialog) {
    this.isGeocoding = false;
    this.noResult = false;
    this.results = [];
  }

  ngOnInit() {
    this.mapService.initialize();
  }

  search() {
    if (!this.placeName) {
      return;
    }

    this.isGeocoding = true;
    this.noResult = false;
    this.selectedIndex = undefined;
    this.mapService.clear();
    this.results = [];

    this.http
        .get(`http://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.placeName)}&format=json&limit=10&polygon_geojson=1`)
        .map(res => res.json())
        .finally(() => {
          this.isGeocoding = false;
        })
        .subscribe(results => {
          this.results = results.filter(result => {
            return result.osm_type === 'relation';
          });

          this.noResult = this.results.length === 0;
        }, () => {
          this.noResult = true;
        });
  }

  clear() {
    this.noResult = false;
    this.results = [];
    this.placeName = '';
    this.selectedIndex = undefined;
    this.mapService.clear();
  }

  openDetails(placeID) {
    window.open(`http://nominatim.openstreetmap.org/details.php?place_id=${placeID}`);
  }

  openAboutDialog() {
    this.dialog.open(AboutDialogComponent);
  }

  showBoundary(geometry, index) {
    this.selectedIndex = index;
    this.mapService.showBoundary(geometry);
  }

  downloadGeoJSON(result) {
    let cloned = JSON.parse(JSON.stringify(result));
    delete cloned.geojson;

    let geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: result.geojson,
          properties: cloned
        }
      ]
    };

    let blob = new Blob([JSON.stringify(geojson)], { type: 'application/json' });
    saveAs(blob, 'boundary.geojson');
  }
}
