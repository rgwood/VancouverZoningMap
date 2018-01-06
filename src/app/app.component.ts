import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app';

  constructor(private http: Http) { }

  ngOnInit(): void {
    console.log();
    console.log(document);

    var mymap: L.Map = L.map('map').setView([49.246292, -123.116226], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(mymap);

    this.http.get("assets/parcels.geojson")
    .subscribe((data) => {
      L.geoJSON(data.json()).addTo(mymap);
    },
    err => { console.log(err); });


    // function onEachFeature(feature, layer) {
    //   if (feature.properties) {
    //     var area = areaCalculator.geometry(feature.geometry);
    //     layer.bindPopup(`${feature.properties.ZONE_NAME}, ${feature.properties.CATEGORY}. Area: ${area.toFixed(0)} m`);
    //   }
    // }
    //  getJSON('zoning.geojson',
    //   function (data) {
    //     L.geoJSON(data.features, { onEachFeature: onEachFeature }).addTo(mymap);
    //   });
  
  }
}
