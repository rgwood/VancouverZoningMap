import { Component } from '@angular/core';
import { Http } from '@angular/http';
import  {} from 'mapbox-gl';

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
      center: [ -123.116226, 49.246292],
      zoom: 13
  });

    map.on('load', () => {
      map.addSource("parcels-source", {
        "type": "vector",
        "tiles": ["http://localhost:7071/api/GetTile/{x}/{y}/{z}/tile.mvt"]
      });

        map.addLayer({
                       "id": "random",
                       "type": "fill",
                       "source": "parcels-source",
                       "source-layer": "default",
                       "paint": {
                           "fill-color": "#3887be"
                       }});
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


//   let simple: mapboxgl.Style =  {
//     "version": 8,
//     "sources": {
//         "india_states": {
//             "type": "vector",
//             "tiles": ["http://localhost:7071/api/GetTile/{z}/{x}/{y}.mvt"]
//         }
//     },
//     "layers": [{
//             "id": "random",
//             "type": "fill",
//             "source": "india_states",
//             "source-layer": "india_states",
//             "paint": {
//                 "fill-color": "#3887be"
//             }
//         },
//         {
//         "id": "random-line",
//         "type": "line",
//         "source": "india_states",
//         "source-layer": "india_states",
//         "layout": {
//             "line-join": "round",
//             "line-cap": "round"
//         },
//         "paint": {
//             "line-color": "#ff69b4",
//             "line-width": 1
//         }
//     }
//     ]
// };

// var map = new mapboxgl.Map({
//   container: 'map',
//   style: simple,
//   center: [ -123.116226, 49.246292],
//   zoom: 13
// });


  //   var simple = {
  //     "version": 8,
  //     "sources": {
  //         "osm": {
  //             "type": "vector",
  //             "scheme": "tms",
  //             "tiles": ["http://geoserverHost:8080/geoserver/gwc/service/tms/1.0.0/opengeo:hessen@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf"]
  //             //"tiles": ["http://TegolaServerHost:8082/maps/zoning/{z}/{x}/{y}.vector.pbf"]
  //         }
  //     },
  //     "layers": [
  //         {
  //             "id": "background",
  //             "type": "background",
  //             "paint": {
  //                 "background-color": "#ffffff"
  //             }
  //         }, {
  //             "id": "hessen",
  //             "type": "line",
  //             "source": "osm",
  //             "source-layer": "hessen",
  //             "filter": ["==", "$type", "LineString"],
  //             "paint": {
  //                 "line-color": "#3887be"
  //             }
  //         }
  //     ]
  // };
  // map.addLayer(simple);

    // map.addLayer({
    //   'id': 'parcels',
    //   'type': 'fill',
    //   'source': {
    //       'type': 'vector',
    //       'url': 'http://localhost:7071/api/GetTile/{z}/{x}/{y}.mvt'
    //   },
    //   'layout': {},
    //   'paint': {
    //       'fill-color': '#f08',
    //       'fill-opacity': 0.4
    //   }});

 // });


    // var mymap: L.Map = L.map('map').setView([49.246292, -123.116226], 13);

    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    //   maxZoom: 18,
    //   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    //     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    //     'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //   id: 'mapbox.streets'
    // }).addTo(mymap);


    // this.http.get("assets/parcels.geojson")
    // .subscribe((data) => {
    //   L.geoJSON(data.json()).addTo(mymap);
    // },
    // err => { console.log(err); });


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
