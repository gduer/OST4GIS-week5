/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
var myMarkers = [];

var parseData = function(data) {return JSON.parse(data);};

var makeMarkers = function(data, lat, lon) { return _.map(data, function(item){
  var Marker = L.marker([parseFloat(item[lat]), parseFloat(item[lon])]);
  myMarkers.push(Marker);
  return Marker;
});
};

var plotMarkers = function(markers) {
  return _.map(markers, function(item){return item.addTo(map);});};

var resetMap = function() {
  _.map(myMarkers, function (marker) {map.removeLayer(marker);});
   myMarkers = [];
};



$('button#map-button').click(function(e) {
  resetMap();

  var url = $('#url-input').val();
  var downloadData = $.ajax(url);

  var lat = $('#Lat-input').val();
  var lon = $('#Lon-input').val();

  downloadData.done(function(data) {
    var parsed = parseData(data);
    var markers = makeMarkers(parsed, lat, lon);
    plotMarkers(markers);
  });
});


var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
