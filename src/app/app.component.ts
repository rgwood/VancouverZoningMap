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
      zoom: 12
    });
    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {

      let layers: mapboxgl.Layer[] = map.getStyle().layers;
      // Find the index of the first symbol layer in the map style
      let firstSymbolId: string;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          break;
        }
      }
      map.addSource("parcelsSource", {
        "type": "vector",
        "tiles": ["https://gentle-brushlands-12605.herokuapp.com/parcels/{z}/{x}/{y}.pbf"],
        //"tiles": ["http://localhost:3000/parcels/{z}/{x}/{y}.pbf"],
        //"url": "mapbox://gridsvancouver.51cxjj80",
        "minzoom": 9,
        "maxzoom": 15
      })
        .addLayer({
          "id": "parcelLayer",
          "type": "fill",
          "source": "parcelsSource",
          "source-layer": "default",
          "paint": {
            "fill-color": [
              "rgb",

              70,
              70,
              //blue is 255 for buildings built in 2018, less for older buildings
              ["-", 255,
                ["*", 2,
                  ["-", 2018, ["get", "year_built"]], //age
                ]
              ]
            ]
          }
        }, firstSymbolId)
        .on('click', 'parcelLayer', function (e) {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`${e.features[0].properties.address}<br>
                      ${e.features[0].properties.area_sq_m.toLocaleString('en-us')} m<sup>2</sup><br>
                      Built in ${e.features[0].properties.year_built}.<br>
                      Zoning: ${e.features[0].properties.zone_name}`)
            .addTo(map);
        })
        .on('mousemove', function (e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ["parcelLayer"] });
          map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        });

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
