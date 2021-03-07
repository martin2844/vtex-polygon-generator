const circleToPolygon = require('circle-to-polygon');
const fs = require("fs");
const axios = require("axios");

let addresses = ["Alsina 97, San Isidro", "Rodriguez Pena 455, CABA"];
let googleKey = "YOUR_API_KEY"

//POLYGON GEN WORKS AS FOLLOWS--> This will be run in the loop below.
// const coordinates = [-58.4861844, -34.5269672]; //[lon, lat]
// const radius = 4500;                           // in meters
// const numberOfEdges = 12;                     //optional that defaults to 32
 
// let polygon = circleToPolygon(coordinates, radius, numberOfEdges);

const generatePolygons = async (addresses) => {
    await addresses.forEach(async (add, i) => {
        console.log(add);
        let cleanAdd = add.replace(/\s/g, "+")
        console.log(cleanAdd);
        try {
            let res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cleanAdd}&key=${googleKey}`);
            console.log(res.data.results[0].geometry.location)
            let coordinatesAll = res.data.results[0].geometry.location;
            let coordinates = [coordinatesAll.lng, coordinatesAll.lat];
            let polygon = circleToPolygon(coordinates, 4500, 12);
            fs.writeFileSync(`polygon${i}.json`, JSON.stringify(polygon.coordinates[0]));
        } catch (error) {
            console.log(error);   
        }
  
    })
}

generatePolygons(addresses)





