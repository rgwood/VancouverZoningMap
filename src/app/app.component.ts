import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { } from 'mapbox-gl';
import { LngLat, Control } from 'mapbox-gl/dist/mapbox-gl';
import {CustomMapboxControl} from './CustomMapboxControl';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  legendDisplayStyle: string = "";

  constructor(private http: Http) { }

  ngOnInit(): void {
    mapboxgl.accessToken = "pk.eyJ1IjoiZ3JpZHN2YW5jb3V2ZXIiLCJhIjoiY2pjM3poNHBuMThqNTJ3cGZ2ZnZhbzd3OCJ9.-u65hk-BENoC1ZvnLEsH6Q";

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-123.116226, 49.246292],
      zoom: 12
    });

    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true,
          timeout:10000 //in ms
      },
      trackUserLocation: true
  }));
  //todo: hide navigation control on mobile because two-finger zoom/rotate is better
    map.addControl(new mapboxgl.NavigationControl());
    var customControl = new CustomMapboxControl( () => this.toggleLegendVisibility());
    map.addControl(customControl);

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
        "minzoom": 6,
        "maxzoom": 15
      })
        .addLayer({
          "id": "parcelLayer",
          "type": "fill",
          "source": "parcelsSource",
          "source-layer": "default",
          "paint": {
            "fill-opacity": 0.8,
            "fill-color": 
            ["case", 
              //yellow for SFHs
              ["get", "sfh_only"],["rgb", 255,255,0],
              //default blue
              ["rgb", 0,102,255]
          ]
            /*[
              "rgb",
              70,
              70,
              //blue is 255 for buildings built in 2018, less for older buildings
              ["-", 255,
                ["*", 2,
                  ["-", 2018, ["get", "year_built"]], //age
                ]
              ]
            ]*/
          }
        }, firstSymbolId)
        .on('click', 'parcelLayer', function (e) {
          console.log(e.features);
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`${e.features[0].properties.address}<br>
                      ${e.features[0].properties.area_sq_m.toLocaleString('en-us')} m<sup>2</sup><br>
                      Built in ${e.features[0].properties.year_built}.<br>
                      Zoning: ${e.features[0].properties.zone_name}<br>
                      SFH only: ${e.features[0].properties.sfh_only}`)
            .addTo(map);
        })
        .on('mousemove', function (e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ["parcelLayer"] });
          map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        });
    });
  }

  toggleLegendVisibility(): void {
    if(this.legendDisplayStyle == ''){
      this.legendDisplayStyle = 'none'
    }
    else{
      this.legendDisplayStyle = '';
    }
  }
}
