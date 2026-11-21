[out:json][timeout:90];
area["boundary"="administrative"]["name"="Weißensee"]["admin_level"="10"]->.w;
(nwr(area.w)["leisure"~"^(playground|pitch|sports_centre|stadium|fitness_station|track|swimming_pool|sports_hall|ice_rink|water_park|fitness_centre|marina|beach_resort)$"];
 nwr(area.w)["amenity"~"^(boat_rental|marketplace)$"];
 nwr(area.w)["sport"]["leisure"!~"."];);
out tags center;
