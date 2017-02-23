import { expect } from 'chai';
import ConversionService from '../../src/services/conversion.service';

describe('ConversionService', () => {

  it('toFeatureCollection() should return a valid GeoJSON feature collection.', () => {
    let converter = new ConversionService();
    let featureCollection = converter.toFeatureCollection({
      geojson: {
        type: 'Polygon',
        coordinates: [
          [[0, 0], [0, 1], [1, 1]]
        ]
      },
      place_id: 1
    });

    expect(featureCollection.type).equal('FeatureCollection');
    expect(featureCollection.features).to.be.an('array');
    expect(featureCollection.features.length).equal(1);
    expect(featureCollection.features[0].properties.place_id).equal(1);
  });

});
