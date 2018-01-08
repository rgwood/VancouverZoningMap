SELECT ST_AsMVT(q, 'test', 4096, 'geom') FROM (SELECT 1 AS c1,
    ST_AsMVTGeom(ST_GeomFromText('POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10), (20 30, 35 35, 30 20, 20 30))'),
    ST_MakeBox2D(ST_Point(0, 0), ST_Point(4096, 4096)), 4096, 0, false) AS geom) AS q;
    
select *, box2d(geom) from van_parcels limit 10;





SELECT ST_AsMVT(tile) 
FROM 
(SELECT id, name, 
 ST_AsMVTGeom(geom, 
              ST_Makebox2d(ST_transform(ST_SetSrid(ST_MakePoint(%s,%s),4326),3857),ST_transform(ST_SetSrid(ST_MakePoint(%s,%s),4326),3857)), 
              4096, 0, false) AS geom FROM van_parcels) AS tile
              
select ST_Makebox2d(ST_transform(ST_SetSrid(ST_MakePoint(-123.1787,49.23912),4326),3857),
                                 ST_transform(ST_SetSrid(ST_MakePoint(-123.1348,49.21042),4326),3857))
              
              
              
select * from van_parcels
where geom && ST_Makebox2d(ST_transform(ST_SetSrid(ST_MakePoint(-123.1787,49.25346),4326),3857),
                           ST_transform(ST_SetSrid(ST_MakePoint(-123.1567,49.2678),4326),3857))
                           

select * from van_parcels
where geom && ST_Makebox2d(ST_MakePoint(-123.1787,49.25346),
                           ST_MakePoint(-123.1567,49.2678))