# Vancouver Zoning Map - Work In Progress

The client side of a map of all Vancouver properties. [Live version here](http://vanmap.reillywood.com) (give it 15 seconds if the map doesn't show up right away, it's running on a free Heroku instance).

## Technical deets

This is an Angular 5 web app generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3, using [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js).

The mapping data is pulled from a PostGIS database then processed using [Tippecanoe](https://github.com/mapbox/tippecanoe) to significantly reduce the data size at lower zoom levels. Tippecanoe saves to an mbtiles file ([it's a neat format!](https://www.reillywood.com/blog/mbtiles-format/)), and [mbtiles files are very easy to serve](https://github.com/rgwood/mbtiles-server/blob/master/index.js).

## Acknowledgments

The underlying data comes from [Vancouver Open Data](http://vancouver.ca/your-government/open-data-catalogue.aspx) and [Metro Vancouver Open Data](http://www.metrovancouver.org/data), and kudos to them for sharing it.

The map is significantly inspired by Jens von Bergmann's [much nicer and featureful Vancouver assessment map](https://mountainmath.ca/map/assessment), and I'm also in debt to Jens for sharing his cleaned-up open data. He did much of the unpleasant work of joining up multiple not-quite-perfect data sets.

## Build

Run `npm run-script build` to build the project, or `npm run-script serve` to serve it. The build artifacts will be stored in the `dist/` directory, without hashes.

## Deploy to Netlify

`npm run-script netlify-deploy`