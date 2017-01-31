import { Injectable } from '@angular/core';
import { Map, GeoJSON } from 'leaflet';

@Injectable()
export default class MapService {
  public map: Map;
  private currentLayer: GeoJSON;

  constructor() {

  }

  initialize() {
    if (this.map) {
      return;
    }

    this.map = L.map('map', {
        zoomControl: true,
        center: L.latLng(0, 0),
        zoom: 2,
        minZoom: 3,
        maxZoom: 19
    });

    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
    }).addTo(this.map);

    L.control.scale().addTo(this.map);
  }

  showBoundary(geometry) {
    this.clear();

    let featureCollection: GeoJSON.FeatureCollection<any> = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: geometry,
          properties: {}
        }
      ]
    };

    this.currentLayer = L.geoJSON(featureCollection, {
      style: () => {
        return {
          color: '#3F51B5',
          fillColor: '#3F51B5'
        };
      }
    }).addTo(this.map);

    this.map.fitBounds(this.currentLayer.getBounds());
  }

  clear() {
    if (this.currentLayer) {
      this.map.removeLayer(this.currentLayer);
      this.currentLayer = undefined;
    }
  }
}
