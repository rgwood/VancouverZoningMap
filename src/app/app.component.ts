import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { } from 'mapbox-gl';
import { LngLat, Control } from 'mapbox-gl/dist/mapbox-gl';
import { CustomMapboxControl } from './CustomMapboxControl';
import { ZoningCodeDescriptor } from './ZoningCodeDescriptor';
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
        timeout: 10000 //in ms
      },
      trackUserLocation: true
    }));
    //todo: hide navigation control on mobile because two-finger zoom/rotate is better
    map.addControl(new mapboxgl.NavigationControl());
    var customControl = new CustomMapboxControl(() => this.toggleLegendVisibility());
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
                ["get", "sfh_only"], ["rgb", 255, 255, 0],
                //default blue
                ["rgb", 0, 102, 255]
              ]
          }
        }, firstSymbolId)
        .on('click', 'parcelLayer', function (e) {
          let areaInSqMetres = Number(e.features[0].properties.area_sq_m);
          let areaInSqFt: number = Math.round(areaInSqMetres * 10.76391); //square feet in 1 sq m
          let zoneCode: string = e.features[0].properties.zone_name;
          //todo: retrieve zone name and page from service
          let zoningCodeDescriptor = AppComponent.getZoningCodeDescriptor(zoneCode);
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            //I do not like that I'm building HTML manually here, but prerendering an Angular component seems fairly unpleasant these days.
            //Revisit this if the popup gets more complex
            .setHTML(`<strong>${e.features[0].properties.address}</strong><br>
                      Zoning: <a href='https://www.reillywood.com/vanmap/${zoningCodeDescriptor.RelativeURL}' target='_blank'>${zoningCodeDescriptor.Name}, ${zoneCode || 'Unknown'}</a><br>
                      Area: ${areaInSqMetres.toLocaleString('en-us')} m<sup>2</sup> 
                           (${areaInSqFt.toLocaleString('en-us')} ft<sup>2</sup>)<br>
                      Built in ${ e.features[0].properties.year_built || 'N/A'}`)
            .addTo(map);
        })
        .on('mousemove', function (e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ["parcelLayer"] });
          map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        });
    });
  }

  toggleLegendVisibility(): void {
    if (this.legendDisplayStyle == '') {
      this.legendDisplayStyle = 'none'
    }
    else {
      this.legendDisplayStyle = '';
    }
  }

  static getZoningCodeDescriptor(code:string): ZoningCodeDescriptor{
    //This is obviously horrendous. But! I don't want to store redundant info in the tileset,
    //and the set of high-level zoning districts almost never changes. Better this than spending time 
    //on a gold-plated solution.
    
    let upperCaseCode = code.toUpperCase();
    
    if (upperCaseCode == "BCPED")
      return new ZoningCodeDescriptor("B.C. Place/Expo", "special");
    if (upperCaseCode.startsWith("C-"))
      return new ZoningCodeDescriptor("Commercial", "commercial");
    if (upperCaseCode.startsWith("CD-1"))
      return new ZoningCodeDescriptor("Comprehensive Development", "comprehensivedevelopment");
    if (upperCaseCode == "CWD")
      return new ZoningCodeDescriptor("Central Waterfront", "special");
    if (upperCaseCode == "DD")
      return new ZoningCodeDescriptor("Downtown", "special");
    if (upperCaseCode == "DEOD")
      return new ZoningCodeDescriptor("Downtown-Eastside/Oppenheimer", "special");
    if (upperCaseCode == "FC-1")
      return new ZoningCodeDescriptor("East False Creek", "special");
    if (upperCaseCode == "FCCDD")
      return new ZoningCodeDescriptor("False Creek Comprehensive Development", "comprehensivedevelopment");
    if (upperCaseCode == "FM-1")
      return new ZoningCodeDescriptor("Fairview", "special");
    if (upperCaseCode == "FSD")
      return new ZoningCodeDescriptor("First Shaughnessy", "shaughnessy");
    if (upperCaseCode.startsWith("HA-"))
      return new ZoningCodeDescriptor("Historic Area", "special");
    if (upperCaseCode.startsWith("I-") || upperCaseCode.startsWith("IC-"))
      return new ZoningCodeDescriptor("Light Industrial", "industrial");
    if (upperCaseCode.startsWith("M-"))
      return new ZoningCodeDescriptor("Industrial", "industrial");
    if (upperCaseCode.startsWith("MC-"))
      return new ZoningCodeDescriptor("Light Industrial Mixed Use", "industrial");
    if (upperCaseCode.startsWith("RA-"))
      return new ZoningCodeDescriptor("Limited Agriculture", "special");
    if (upperCaseCode.startsWith("RM-"))
      return new ZoningCodeDescriptor("Multiple Dwelling", "multipledwelling");
    if (upperCaseCode.startsWith("RS-"))
      return new ZoningCodeDescriptor("One-Family Dwelling", "rs");
    if (upperCaseCode.startsWith("RT-"))
      return new ZoningCodeDescriptor("Two-Family Dwelling", "rt");

    throw new Error(`Zoning code '${code}' not found`);
  }
}