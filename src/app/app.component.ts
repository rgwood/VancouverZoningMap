import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { } from 'mapbox-gl';
import { LngLat } from 'mapbox-gl/dist/mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) { }

  ngOnInit(): void {
    console.log();
    console.log(document);

    mapboxgl.accessToken = "pk.eyJ1IjoiZ3JpZHN2YW5jb3V2ZXIiLCJhIjoiY2pjM3poNHBuMThqNTJ3cGZ2ZnZhbzd3OCJ9.-u65hk-BENoC1ZvnLEsH6Q";

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-123.116226, 49.246292],
      zoom: 11
    });

    map.on('load', () => {
      map.addSource("parcelsSource", {
        "type": "vector",
        "tiles": ["http://localhost:3000/parcels/{z}/{x}/{y}.pbf"],
        "minzoom": 11,
        "maxzoom": 15
      });

      let layers: mapboxgl.Layer[] = map.getStyle().layers;
      // Find the index of the first symbol layer in the map style
      let firstSymbolId: string;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          break;
        }
      }

      map.addLayer({
        "id": "parcelLayer",
        "type": "fill",
        "source": "parcelsSource",
        "source-layer": "default",
        "paint": {
          "fill-color": [
            "rgb",
            //["get", "random"],
            30,
            0,
            50
          ]
        }
      }, firstSymbolId);
      map.addControl(new mapboxgl.NavigationControl());
    });

    map.on('click', 'parcelLayer', function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.address)
        .addTo(map);
    });

    
    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point,{layers:["parcelLayer"]});
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
  });

    // map.on('load', () => {
    //   map.addLayer({
    //     "id": "terrain-data",
    //     "type": "line",
    //     "source": {
    //         type: 'vector',
    //         url: 'https://vector.mapzen.com/osm/all/{z}/{x}/{y}.mvt'
    //         //url: 'http://localhost:7071/api/GetTile/{z}/{x}/{y}.mvt'
    //     },
    //     "source-layer": "contour",
    //     "layout": {
    //         "line-join": "round",
    //         "line-cap": "round"
    //     },
    //     "paint": {
    //         "line-color": "#ff69b4",
    //         "line-width": 1
    //     }
    // });




  }
}
