import { Injectable } from '@angular/core';

@Injectable()
export default class ConversionService {

  constructor() {

  }

  toFeatureCollection(data) {
    let cloned = JSON.parse(JSON.stringify(data));
    delete cloned.geojson;

    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: data.geojson,
          properties: cloned
        }
      ]
    };
  }
}
